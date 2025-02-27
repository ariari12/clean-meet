package com.project.spring.cleanmeet.domain.user.service;

import com.project.spring.cleanmeet.common.exception.DuplicateEmailException;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCompanyCategory;
import com.project.spring.cleanmeet.domain.servicecategory.mapper.ServiceCompanyCategoryMapper;
import com.project.spring.cleanmeet.domain.servicecategory.repository.ServiceCategoryRepository;
import com.project.spring.cleanmeet.domain.servicecategory.repository.ServiceCompanyCategoryRepository;
import com.project.spring.cleanmeet.domain.user.dto.*;
import com.project.spring.cleanmeet.domain.user.dto.company.*;
import com.project.spring.cleanmeet.domain.user.dto.user.UserProfileResponseDto;
import com.project.spring.cleanmeet.domain.user.dto.user.UserRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import com.project.spring.cleanmeet.domain.user.entity.Role;
import com.project.spring.cleanmeet.domain.user.entity.User;
import com.project.spring.cleanmeet.domain.user.mapper.AddressMapper;
import com.project.spring.cleanmeet.domain.user.mapper.CompanyMapper;
import com.project.spring.cleanmeet.domain.user.mapper.UserMapper;
import com.project.spring.cleanmeet.domain.user.repository.AddressRepository;
import com.project.spring.cleanmeet.domain.user.repository.CompanyRepository;
import com.project.spring.cleanmeet.domain.user.repository.RedisCompanyRepository;
import com.project.spring.cleanmeet.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ServiceCompanyCategoryRepository serviceCompanyCategoryRepository;
    private final AddressRepository addressRepository;
    private final RedisCompanyRepository redisCompanyRepository;

    private final UserService userService;

    private final ServiceCompanyCategoryMapper serviceCompanyCategoryMapper;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final CompanyMapper companyMapper;
    private final PasswordEncoder passwordEncoder;

    public void companySave(CompanyRequestDto companyRequestDto) {
        log.info("회사 회원가입 시작: companyName={}", companyRequestDto.getCompanyName());

        UserRequestDto userRequestDto = companyRequestDto.getUserRequestDto();
        AddressRequestDto addressRequestDto = userRequestDto.getAddressRequestDto();

        //중복 회원가입 방지
        isEmailExists(userRequestDto.getEmail());

        //유저 저장
        User user = userMapper.toEntity(userRequestDto);
        user.updateRole(Role.ROLE_COMPANY);
        // 패스워드 검증 및 해싱
        user.encodePassword(passwordEncoder, userRequestDto.getPassword());
        User savedUser = userRepository.save(user);
        log.info("회사 유저정보 저장 완료 : {}", savedUser);

        // 주소 저장
        Address address = addressMapper.toEntity(addressRequestDto,savedUser);
        Address savedAddress = addressRepository.save(address);
        log.info("회사 주소 저장 완료 : {}", savedAddress);

        // 회사 저장
        Company company = companyMapper.toEntity(companyRequestDto, user);
        Company savedCompany = companyRepository.save(company);
        log.info("회사 정보 저장 완료 : {}", savedCompany);

        // 서비스 카테고리와의 관계 설정
        List<ServiceCompanyCategory> serviceCompanyCategoryList = companyRequestDto
                .getServiceCategory()
                .stream()
                .map(dto -> {
                            // 카테고리 이름을 기준으로 ServiceCategory 엔티티 조회
                            ServiceCategory serviceCategory = serviceCategoryRepository.findByName(dto.getName())
                                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 서비스 카테고리 " + dto.getName()));

                            return serviceCompanyCategoryMapper.toEntity(savedCompany, serviceCategory);
                        }
                ).toList();

        List<ServiceCompanyCategory> savedServiceCompanyCategory =
                serviceCompanyCategoryRepository.saveAll(serviceCompanyCategoryList);

        log.info("회사 서비스카테고리 저장 완료: {}", savedServiceCompanyCategory);
    }

    public Page<CompanyCardPageResponse> findCompanyAllPage(Pageable pageable) {
        log.info("회사 카드 페이지 조회 시작 : {}", pageable);
        Page<Company> companyCardPage = companyRepository.findCompanyCardPage(pageable);
        log.info("회사 카드 페이지 조회 완료  : {}", companyCardPage.getContent());
        return companyCardPage.map(companyMapper::toDto);
    }

    public CompanyProfileResponseDto findCompanyProfile(Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("회사 프로필 조회 시작 userId : {}", customUser.getId());

        // 유저 조회 로직
        UserProfileResponseDto userProfile = userService.findUserProfile(auth);

        Company company = companyRepository.findByUserId(Long.valueOf(customUser.getId()))
                .orElseThrow(() -> new IllegalArgumentException("회사를 찾을 수 없습니다. userId: " + customUser.getId()));
        log.info("회사 조회 완료 company : {}", company);

        List<String> companyTags = redisCompanyRepository.findCompanyTags(company.getId());
        log.info("태그 조회 완료 companyTags : {}", companyTags);

        CompanyProfileResponseDto companyProfileResponseDto = companyMapper.companyProfileDto(company, companyTags, userProfile);
        log.info("회사 프로필 조회 완료  companyProfileResponseDto : {}", companyProfileResponseDto);
        return companyProfileResponseDto;
    }

    public CompanyTagsResponseDto updateTags(CompanyTagsRequestDto dto, Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("태그 업데이트 시작 dto : {}", dto);
        Company company = companyRepository.findByUserId(Long.valueOf(customUser.getId()))
                .orElseThrow(
                        () -> new IllegalArgumentException("회사 정보를 찾을 수 없습니다.  userId: " + customUser.getId())
                );

        if(dto.getTags() != null) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    redisCompanyRepository.deleteCompanyTag(company.getId(), dto.getTags());
                    redisCompanyRepository.saveCompanyTag(company.getId(), dto.getTags());
                }
            });
        }
        List<String> companyTags = redisCompanyRepository.findCompanyTags(company.getId());
        CompanyTagsResponseDto companyTagsResponseDto = new CompanyTagsResponseDto(companyTags);
        log.info("태그 업데이트 종료");
        return companyTagsResponseDto;
    }

    private void isEmailExists(String email) {
        Boolean isExist = userRepository.existsByEmail(email);
        if (isExist) {
            throw new DuplicateEmailException("이미 등록된 이메일입니다 " + email);
        }
    }

    public CompanyDescriptionResponseDto updateDescription(CompanyDescriptionRequestDto companyDescriptionRequestDto, Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("회사 상세정보 업데이트 시작 description : {}", companyDescriptionRequestDto);
        Company company = companyRepository.findByUserId(Long.valueOf(customUser.getId()))
                .orElseThrow(
                        () -> new IllegalArgumentException("회사 정보를 찾을 수 없습니다.  userId: " + customUser.getId())
                );
        log.info("회사 조회 완료 company : {}", company);

        Company updateDescription = company.updateDescription(companyDescriptionRequestDto.getDescription());
        CompanyDescriptionResponseDto dto = companyMapper.companyDescriptionDto(updateDescription.getDescription());
        log.info("회사 업데이트 완료 companyDescriptionDto : {}", dto);
        return dto;
    }

    public CompanyVisibilityResponseDto updateVisibility(CompanyVisibilityRequestDto companyVisibilityRequestDto,
                                                         Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("회사 열람 업데이트 시작  dto : {}", companyVisibilityRequestDto);
        Company company = companyRepository.findByUserId(Long.valueOf(customUser.getId()))
                .orElseThrow(
                        () -> new IllegalArgumentException("회사 정보를 찾을 수 없습니다.  userId: " + customUser.getId())
                );
        log.info("회사 조회 완료 company : {}", company);

        Company updateCompany = company.updateIsPublic(companyVisibilityRequestDto.isPublic());
        CompanyVisibilityResponseDto dto = new CompanyVisibilityResponseDto(updateCompany.isPublic());
        log.info("회사 공개 여부 업데이트 완료 CompanyVisibilityResponseDto : {}", dto);
        return dto;

    }
}
