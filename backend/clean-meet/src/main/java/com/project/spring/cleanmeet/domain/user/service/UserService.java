package com.project.spring.cleanmeet.domain.user.service;

import com.project.spring.cleanmeet.common.exception.DuplicateEmailException;
import com.project.spring.cleanmeet.common.exception.UserNotFoundException;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.domain.image.entity.Image;
import com.project.spring.cleanmeet.domain.image.repository.ImageRepository;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCompanyCategory;
import com.project.spring.cleanmeet.domain.servicecategory.repository.ServiceCategoryRepository;
import com.project.spring.cleanmeet.domain.servicecategory.repository.ServiceCompanyCategoryRepository;
import com.project.spring.cleanmeet.domain.user.dto.*;
import com.project.spring.cleanmeet.domain.user.entity.*;
import com.project.spring.cleanmeet.domain.user.mapper.AddressMapper;
import com.project.spring.cleanmeet.domain.user.mapper.CompanyMapper;
import com.project.spring.cleanmeet.domain.servicecategory.mapper.ServiceCompanyCategoryMapper;
import com.project.spring.cleanmeet.domain.user.mapper.UserMapper;
import com.project.spring.cleanmeet.domain.user.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ServiceCompanyCategoryRepository serviceCompanyCategoryRepository;
    private final ImageRepository imageRepository;

    private final ServiceCompanyCategoryMapper serviceCompanyCategoryMapper;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final CompanyMapper companyMapper;

    private final PasswordEncoder passwordEncoder;


    public void personalSave(UserRequestDto userRequestDto) {
        log.info("개인 회원가입 시작: userRequestDto={}", userRequestDto);

        //중복 회원가입 방지
        isEmailExists(userRequestDto.getEmail());

        //유저 저장
        User user = userMapper.toEntity(userRequestDto);
        user.updateRole(Role.ROLE_PERSONAL);
        // 패스워드 검증 및 해싱
        user.encodePassword(passwordEncoder, userRequestDto.getPassword());
        User savedUser = userRepository.save(user);

        // 주소 저장
        Address address = addressMapper.toEntity(userRequestDto.getAddressRequestDto(),user);
        Address savedAddress = addressRepository.save(address);
        log.info("주소 저장 완료 : {}", savedAddress);

        log.info("회원 가입 성공: email={}", savedUser.getEmail());

    }

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

    private void isEmailExists(String email) {
        Boolean isExist = userRepository.existsByEmail(email);
        if (isExist) {
            throw new DuplicateEmailException("이미 등록된 이메일입니다 " + email);
        }
    }

    public Page<CompanyCardPageResponse> findCompanyAllPage(Pageable pageable) {
        log.info("회사 카드 페이지 조회 시작 : {}", pageable);
        Page<Company> companyCardPage = companyRepository.findCompanyCardPage(pageable);
        log.info("회사 카드 페이지 조회 완료  : {}", companyCardPage.getContent());
        return companyCardPage.map(companyMapper::toDto);
    }

    public UserProfileResponseDto findUserProfile(Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("유저 프로필 조회 시작 customUser={}", customUser);
        Long userId = Long.parseLong(customUser.getId());

        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("존재하지 않는 유저 id 입니다. userId=" + userId));
        log.info("유저 조회 완료 user={}", user);

        Address address = addressRepository.findByUser(user)
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 유저 입니다. user=" + user));
        log.info("주소 조회 완료 address = {}", address);

        UserProfileResponseDto userProfileResponseDto = userMapper.toUserProfile(user, address);
        log.info("유저 프로필 조회 완료 UserProfileResponseDto : {}", userProfileResponseDto);
        return userProfileResponseDto;
    }

    public void updateProfile(UserProfileRequestDto dto , Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("유저 프로필 업데이트 시작 dto : {}", dto);
        User user = userRepository.findById(Long.valueOf(customUser.getId()))
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 userId=" + customUser.getId()));
        log.info("유저 조회 성공 user={}", user);

        user.updateProfile(dto.getName(), dto.getContact());
        log.info("유저 정보 수정 완료 updatedUser={}", user);

        if(dto.getAddressRequestDto() != null) {
            AddressRequestDto addrDto = dto.getAddressRequestDto();
            addressRepository.findByUser(user)
                    .ifPresentOrElse(
                            address -> {
                                address.updateAddress(addrDto);
                                log.info("주소 정보 수정 완료 ");
                            },
                            () -> {
                                Address newAddress = Address.of(user);
                                newAddress.updateAddress(addrDto);
                                Address savedAddress = addressRepository.save(newAddress);
                                log.info("주소 정보 저장 완료 address = {}", savedAddress);
                            }
                    );
        }

        if(dto.getS3Key() != null) {
            imageRepository.findByUser(user)
                    .ifPresentOrElse(
                            img -> {
                                Image updateImage = img.updateS3Key(dto.getS3Key());
                                log.info("이미지 url 수정 완료  image={}", updateImage);
                            }, // 기존 이미지 업데이트
                            () -> {
                                Image newImage = Image.of(dto.getS3Key(), user, null);
                                Image savedImage = imageRepository.save(newImage);// 새로운 이미지 저장
                                log.info("이미지 url 저장 완료   image={}", savedImage);
                            }
                    );

        }
        log.info("프로필 업데이트 완료");
    }

}
