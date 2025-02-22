package com.project.spring.cleanmeet.domain.servicerequest.service;

import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.domain.servicerequest.dto.CommissionCommentRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.CommissionComment;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.servicerequest.repository.CommissionCommentRepository;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceCommissionRepository;
import com.project.spring.cleanmeet.domain.user.entity.User;
import com.project.spring.cleanmeet.domain.servicerequest.mapper.CommissionCommentMapper;
import com.project.spring.cleanmeet.domain.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommissionCommentService {
    private final ServiceCommissionRepository serviceCommissionRepository;
    private final CommissionCommentRepository commissionCommentRepository;
    private final CommissionCommentMapper commissionCommentMapper;
    private final UserRepository userRepository;
    public void save(Long commissionId, Authentication auth, CommissionCommentRequestDto dto) {
        log.info("의뢰 댓글 생성 시작 commissionId={}, auth={}, CommissionCommentRequestDto={}", commissionId, auth, dto);

        CustomUser customUser = (CustomUser) auth.getPrincipal();
        User user = userRepository.findById(Long.parseLong(customUser.getId()))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        log.info("유저 조회 성공 user = {}", user);

        ServiceCommission serviceCommission = serviceCommissionRepository.findById(commissionId)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 의뢰 commissionId=" + commissionId));
        log.info("의뢰 조회 성공 serviceCommission = {}", serviceCommission);

        CommissionComment parentComment = Optional.ofNullable(dto.getParentId())
                        .flatMap(commissionCommentRepository::findById)
                        .orElse(null);
        log.info("부모 댓글 조회 성공 = {}", parentComment);

        CommissionComment commissionComment = commissionCommentMapper
                .toEntity(dto.getDescription(), serviceCommission, user, parentComment);
        CommissionComment savedCommissionComment = commissionCommentRepository.save(commissionComment);
        log.info("댓글 생성 완료  savedCommissionComment = {}", savedCommissionComment);

    }
}
