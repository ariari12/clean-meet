package com.project.spring.cleanmeet.domain.servicerequest.service;

import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceRequest;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceResponse;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceStatus;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceRequestRepository;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceResponseRepository;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import com.project.spring.cleanmeet.domain.user.mapper.ServiceResponseMapper;
import com.project.spring.cleanmeet.domain.user.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ServiceResponseService {
    private final ServiceResponseRepository serviceResponseRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final CompanyRepository companyRepository;
    private final ServiceResponseMapper serviceResponseMapper;
    public void save(ServiceResponseDto serviceResponseDto) {
        log.info("서비스 응답 저장 시작 serviceResponseDto : {}",serviceResponseDto);
        Long serviceRequestId = serviceResponseDto.getServiceRequestId();
        Long companyId = serviceResponseDto.getCompanyId();

        ServiceRequest serviceRequest = serviceRequestRepository.findById(serviceRequestId).orElseThrow(
                () -> new IllegalArgumentException("id가 존재하지 않습니다. serviceRequestId : " + serviceRequestId)
        );
        log.info("서비스 요청 의뢰 조회 성공 : {}", serviceRequest);
        Company company = companyRepository.findById(companyId).orElseThrow(
                () -> new IllegalArgumentException("id가 존재하지 않습니다. companyId : " + companyId)
        );
        log.info("회사 유저 조회 성공 : {}", company);

        ServiceResponse serviceResponse = serviceResponseMapper.toEntity(serviceResponseDto, company, serviceRequest);
        serviceResponse.updateStatus(ServiceStatus.PENDING);
        ServiceResponse savedServiceResponse = serviceResponseRepository.save(serviceResponse);
        log.info("서비스 응답 저장 성공 : {}", savedServiceResponse);


    }
}
