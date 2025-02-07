package com.project.spring.cleanmeet.domain.servicerequest.service;

import com.project.spring.cleanmeet.common.exception.UserNotFoundException;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.servicecategory.repository.ServiceCategoryRepository;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceRequest;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceStatus;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceRequestRepository;
import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import com.project.spring.cleanmeet.domain.user.mapper.AddressMapper;
import com.project.spring.cleanmeet.domain.user.mapper.ServiceRequestMapper;
import com.project.spring.cleanmeet.domain.user.repository.AddressRepository;
import com.project.spring.cleanmeet.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ServiceRequestService {
    private final ServiceRequestRepository serviceRequestRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final ServiceRequestMapper serviceRequestMapper;

    public void save(ServiceRequestDto serviceRequestDto) {
        log.info("서비스 요창 저장 시작 serviceRequestDto : {}",serviceRequestDto);
        User user = userRepository.findById(serviceRequestDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException("존재하지않은 userId"));
        log.info("유저 조회 성공 user : {}", user);

        AddressRequestDto addressRequestDto = serviceRequestDto.getAddressRequestDto();
        Address address = addressMapper.toEntity(addressRequestDto);
        Address savedAddress = addressRepository.save(address);
        log.info("주소 저장 성공 address : {}", savedAddress);

        ServiceCategory serviceCategory = serviceCategoryRepository.findByName(serviceRequestDto.getServiceCategory().getName())
                .orElseThrow(() -> new IllegalArgumentException("Service category not found"));
        log.info("서비스 카테고리 조회 성공 serviceRequest : {}",serviceCategory);

        ServiceRequest serviceRequest = serviceRequestMapper.toEntity(serviceRequestDto, user, savedAddress, serviceCategory);
        serviceRequest.updateServiceStatus(ServiceStatus.PENDING);
        ServiceRequest savedServiceRequest = serviceRequestRepository.save(serviceRequest);
        log.info("서비스 요청 저장 성공 serviceRequest : {}",savedServiceRequest);


    }
}
