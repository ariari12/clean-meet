package com.project.spring.cleanmeet.domain.servicerequest.service;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.spring.cleanmeet.common.exception.UserNotFoundException;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerListResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRedisDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceAnswer;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.servicerequest.repository.RedisAnswerRepository;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceCommissionRepository;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceAnswerRepository;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import com.project.spring.cleanmeet.domain.servicerequest.mapper.ServiceAnswerMapper;
import com.project.spring.cleanmeet.domain.user.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ServiceAnswerService {
    private final ServiceAnswerRepository serviceAnswerRepository;
    private final ServiceCommissionRepository serviceCommissionRepository;
    private final CompanyRepository companyRepository;
    private final RedisAnswerRepository redisAnswerRepository;
    private final ServiceAnswerMapper serviceAnswerMapper;

    public void save(ServiceAnswerRequestDto serviceAnswerRequestDto) {
        log.info("서비스 응답 저장 시작 serviceResponseDto : {}", serviceAnswerRequestDto);
        Long serviceRequestId = serviceAnswerRequestDto.getServiceCommissionId();
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
//        serviceAnswer.updateStatus(ServiceStatus.PENDING);
        ServiceAnswer savedServiceAnswer = serviceAnswerRepository.save(serviceAnswer);
        // 레디스 저장
        redisAnswerRepository.saveUnreadKey(serviceAnswerRequestDto,serviceCommission.getUser().getId());
        log.info("서비스 응답 저장 성공 : {}", savedServiceAnswer);


    }

    public ServiceAnswerListResponseDto findAnswers(Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("유저 응답 목록 조회 시작");
        List<ServiceAnswerRequestDto> unread = redisAnswerRepository.unreadServiceAnswers(Long.valueOf(customUser.getId()));

        Company company = companyRepository.findByUserId(Long.valueOf(customUser.getId()))
                .orElseThrow(() -> new UserNotFoundException("회사 엔티티를 찾을 수 없습니다. userId : " + customUser.getId()));

        List<ServiceAnswer> serviceAnswerList = serviceAnswerRepository.findByCompanyAndIsRead(company, true);
        log.info("DB ServiceAnswer 조회 완료 serviceAnswerList : {}", serviceAnswerList);

        List<ServiceAnswerRequestDto> readAnswers = serviceAnswerList.stream()
                .map(serviceAnswerMapper::toRequestDto)
                .toList();

        log.info("읽은 응답 DB 조회 완료 : {}", readAnswers);
        log.info("읽지 않은 응답 레디스 조회 완료 : {}", unread);

        ServiceAnswerListResponseDto answerList = serviceAnswerMapper.toAnswerList(readAnswers, unread);
        log.info("유저 응답 목록 조회 완료  : {}", answerList);
        return answerList;
    }


}
