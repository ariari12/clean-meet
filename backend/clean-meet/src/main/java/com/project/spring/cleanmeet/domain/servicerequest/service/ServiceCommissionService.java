package com.project.spring.cleanmeet.domain.servicerequest.service;

import com.project.spring.cleanmeet.common.exception.UserNotFoundException;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.servicecategory.repository.ServiceCategoryRepository;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceCommissionRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceCommissionResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceStatus;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceCommissionRepository;
import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import com.project.spring.cleanmeet.domain.user.mapper.AddressMapper;
import com.project.spring.cleanmeet.domain.user.mapper.ServiceCommissionMapper;
import com.project.spring.cleanmeet.domain.user.repository.AddressRepository;
import com.project.spring.cleanmeet.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ServiceCommissionService {
    private final ServiceCommissionRepository serviceCommissionRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final ServiceCommissionMapper serviceCommissionMapper;

    public void save(ServiceCommissionRequestDto serviceCommissionRequestDto) {
        log.info("서비스 요창 저장 시작 serviceCommissionDto : {}", serviceCommissionRequestDto);
        User user = userRepository.findById(serviceCommissionRequestDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException("존재하지않은 userId"));
        log.info("유저 조회 성공 user : {}", user);

        AddressRequestDto addressRequestDto = serviceCommissionRequestDto.getAddressRequestDto();
        Address address = addressMapper.toEntity(addressRequestDto);
        Address savedAddress = addressRepository.save(address);
        log.info("주소 저장 성공 address : {}", savedAddress);

        ServiceCategory serviceCategory = serviceCategoryRepository.findByName(serviceCommissionRequestDto.getServiceCategory().getName())
                .orElseThrow(() -> new IllegalArgumentException("Service category not found"));
        log.info("서비스 카테고리 조회 성공 serviceCategory : {}",serviceCategory);

        ServiceCommission serviceCommission = serviceCommissionMapper.toEntity(serviceCommissionRequestDto, user, savedAddress, serviceCategory);
        serviceCommission.updateServiceStatus(ServiceStatus.PENDING);
        ServiceCommission savedServiceCommission = serviceCommissionRepository.save(serviceCommission);
        log.info("서비스 요청 저장 성공 serviceCommission : {}", savedServiceCommission);


    }

    public List<ServiceCommissionResponseDto> findAll() {
        List<ServiceCommission> all = serviceCommissionRepository.findAll();
        log.info("all: {}", all);
        List<ServiceCommissionResponseDto> list =
                all.stream()
                        .map(serviceCommissionMapper::toDto)
                        .toList();
        log.info("의뢰 목록들 조회 성공 {}", list);
        return list;
    }
}
