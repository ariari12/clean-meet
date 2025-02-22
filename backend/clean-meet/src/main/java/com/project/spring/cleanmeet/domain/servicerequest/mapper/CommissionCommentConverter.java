package com.project.spring.cleanmeet.domain.servicerequest.mapper;

import com.project.spring.cleanmeet.domain.servicerequest.dto.ChildCommentResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ParentCommentResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.CommissionComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CommissionCommentConverter {
    private final CommissionCommentMapper commissionCommentMapper;
    public ParentCommentResponseDto commentResponseDto(CommissionComment commissionComment) {
        if (commissionComment == null) {
            return commissionCommentMapper.toParentCommentDto(commissionComment);
        }else{
            return ParentCommentResponseDto.builder()
                    .id(commissionComment.getId())
                    .userId(commissionComment.getUser().getId())
                    .name(commissionComment.getUser().getName())
                    .description(commissionComment.getDescription())
                    .childComments(
                            commissionComment.getChildComments()
                                    .stream()
                                    .map(commissionCommentMapper::toChildCommentDto)
                                    .toList()
                    )
                    .createdAt(commissionComment.getCreatedAt())
                    .updatedAt(commissionComment.getUpdatedAt())
                    .build();
        }

    }
}
