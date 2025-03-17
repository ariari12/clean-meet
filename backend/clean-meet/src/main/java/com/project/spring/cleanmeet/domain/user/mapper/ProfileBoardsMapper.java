package com.project.spring.cleanmeet.domain.user.mapper;

import com.project.spring.cleanmeet.domain.servicerequest.dto.AnswerProfileDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.CommentProfileDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.CommissionProfileDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.CommissionComment;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceAnswer;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.user.dto.user.ProfileBoardsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProfileBoardsMapper {

    public Page<CommissionProfileDto> toCommission(Page<ServiceCommission> commissions) {
        List<CommissionProfileDto> dtoList = commissions.getContent().stream()
                .map(this::toDto) // 개별 변환
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, commissions.getPageable(), commissions.getTotalElements());
    }

    public Page<CommentProfileDto> toComments(Page<CommissionComment> comments) {
        List<CommentProfileDto> dtoList = comments.getContent().stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, comments.getPageable(), comments.getTotalElements());
    }

    public Page<AnswerProfileDto> toAnswers(Page<ServiceAnswer> answers) {
        List<AnswerProfileDto> dtoList = answers.getContent().stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, answers.getPageable(), answers.getTotalElements());
    }

    // 개별 변환 메서드 (각 DTO로 변환)
    private CommissionProfileDto toDto(ServiceCommission commission) {
        return new CommissionProfileDto(commission.getId(), commission.getTitle(), commission.getCreatedAt());
    }

    private CommentProfileDto toDto(CommissionComment comment) {
        return new CommentProfileDto(comment.getId(), comment.getDescription(), comment.getCreatedAt());
    }

    private AnswerProfileDto toDto(ServiceAnswer answer) {
        return new AnswerProfileDto(answer.getId(), answer.getTitle(), answer.getCreatedAt());
    }

    public ProfileBoardsDto toMyBoards(Page<CommissionProfileDto> commissionProfileDtos, Page<CommentProfileDto> commentProfileDtos, Page<AnswerProfileDto> answerProfileDtos) {
        return new ProfileBoardsDto(commissionProfileDtos, commentProfileDtos, answerProfileDtos);
    }

    public ProfileBoardsDto toMyBoards(Page<CommissionProfileDto> commissionProfileDtos, Page<CommentProfileDto> commentProfileDtos) {
        return new ProfileBoardsDto(commissionProfileDtos, commentProfileDtos);
    }
}
