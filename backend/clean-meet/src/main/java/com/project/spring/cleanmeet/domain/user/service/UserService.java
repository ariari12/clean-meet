package com.project.spring.cleanmeet.domain.user.service;

import com.project.spring.cleanmeet.common.exception.DuplicateEmailException;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCompanyCategory;
import com.project.spring.cleanmeet.domain.servicecategory.repository.ServiceCategoryRepository;
import com.project.spring.cleanmeet.domain.servicecategory.repository.ServiceCompanyCategoryRepository;
import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import com.project.spring.cleanmeet.domain.user.dto.CompanyCardPageResponse;
import com.project.spring.cleanmeet.domain.user.dto.CompanyRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.*;
import com.project.spring.cleanmeet.domain.user.mapper.AddressMapper;
import com.project.spring.cleanmeet.domain.user.mapper.CompanyMapper;
import com.project.spring.cleanmeet.domain.servicecategory.mapper.ServiceCompanyCategoryMapper;
import com.project.spring.cleanmeet.domain.user.mapper.UserMapper;
import com.project.spring.cleanmeet.domain.user.dto.UserRequestDto;
import com.project.spring.cleanmeet.domain.user.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    private final ServiceCompanyCategoryMapper serviceCompanyCategoryMapper;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final CompanyMapper companyMapper;

    private final PasswordEncoder passwordEncoder;

    public void personalSave(UserRequestDto userRequestDto) {
        log.info("개인 회원가입 시작: email={}", userRequestDto.getEmail());

        //중복 회원가입 방지
        isEmailExists(userRequestDto.getEmail());

        // 주소 저장
        Address address = addressMapper.toEntity(userRequestDto.getAddressRequestDto());
        Address savedAddress = addressRepository.save(address);
        log.info("주소 저장 완료 : {}", savedAddress);

        //유저 저장
        User user = userMapper.toEntity(userRequestDto);
        user.updateRole(Role.ROLE_PERSONAL);
        user.updateAddress(savedAddress);
        // 패스워드 검증 및 해싱
        user.encodePassword(passwordEncoder, userRequestDto.getPassword());
        User savedUser = userRepository.save(user);
        log.info("회원 가입 성공: email={}", savedUser.getEmail());

    }

    public void companySave(CompanyRequestDto companyRequestDto) {
        log.info("회사 회원가입 시작: companyName={}", companyRequestDto.getCompanyName());

        UserRequestDto userRequestDto = companyRequestDto.getUserRequestDto();
        AddressRequestDto addressRequestDto = userRequestDto.getAddressRequestDto();

        //중복 회원가입 방지
        isEmailExists(userRequestDto.getEmail());

        // 주소 저장
        Address address = addressMapper.toEntity(addressRequestDto);
        Address savedAddress = addressRepository.save(address);
        log.info("회사 주소 저장 완료 : {}", savedAddress);

        //유저 저장
        User user = userMapper.toEntity(userRequestDto);
        user.updateRole(Role.ROLE_COMPANY);
        user.updateAddress(savedAddress);
        // 패스워드 검증 및 해싱
        user.encodePassword(passwordEncoder, userRequestDto.getPassword());
        User savedUser = userRepository.save(user);
        log.info("회사 유저정보 저장 완료 : {}", savedUser);

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

        List<ServiceCompanyCategory> savedServiceCompanyCategory = serviceCompanyCategoryRepository.saveAll(serviceCompanyCategoryList);
        log.info("회사 서비스카테고리 저장 완료: {}", savedServiceCompanyCategory);
    }

    private void isEmailExists(String email) {
        Boolean isExist = userRepository.existsByEmail(email);
        if (isExist) {
            throw new DuplicateEmailException("이미 등록된 이메일입니다 " + email);
        }
    }

    public Page<CompanyCardPageResponse> findCompanyAllPage(Pageable pageable) {
        Page<Company> companyCardPage = companyRepository.findCompanyCardPage(pageable);
        return companyCardPage.map(companyMapper::toDto);
    }
}
