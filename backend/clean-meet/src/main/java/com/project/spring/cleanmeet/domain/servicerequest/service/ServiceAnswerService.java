package com.project.spring.cleanmeet.domain.servicerequest.service;

import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceAnswer;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceStatus;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceCommissionRepository;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceAnswerRepository;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import com.project.spring.cleanmeet.domain.user.mapper.ServiceAnswerMapper;
import com.project.spring.cleanmeet.domain.user.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ServiceAnswerService {
    private final ServiceAnswerRepository serviceAnswerRepository;
    private final ServiceCommissionRepository serviceCommissionRepository;
    private final CompanyRepository companyRepository;
    private final ServiceAnswerMapper serviceAnswerMapper;
    public void save(ServiceAnswerRequestDto serviceAnswerRequestDto) {
        log.info("서비스 응답 저장 시작 serviceResponseDto : {}", serviceAnswerRequestDto);
        Long serviceRequestId = serviceAnswerRequestDto.getServiceRequestId();
        Long companyId = serviceAnswerRequestDto.getCompanyId();

        ServiceCommission serviceCommission = serviceCommissionRepository.findById(serviceRequestId).orElseThrow(
                () -> new IllegalArgumentException("id가 존재하지 않습니다. serviceRequestId : " + serviceRequestId)
        );
        log.info("서비스 요청 의뢰 조회 성공 : {}", serviceCommission);
        Company company = companyRepository.findById(companyId).orElseThrow(
                () -> new IllegalArgumentException("id가 존재하지 않습니다. companyId : " + companyId)
        );
        log.info("회사 유저 조회 성공 : {}", company);

        ServiceAnswer serviceAnswer = serviceAnswerMapper.toEntity(serviceAnswerRequestDto, company, serviceCommission);
        serviceAnswer.updateStatus(ServiceStatus.PENDING);
        ServiceAnswer savedServiceAnswer = serviceAnswerRepository.save(serviceAnswer);
        log.info("서비스 응답 저장 성공 : {}", savedServiceAnswer);


    }
}
