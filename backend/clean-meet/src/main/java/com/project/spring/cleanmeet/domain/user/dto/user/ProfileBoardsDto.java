package com.project.spring.cleanmeet.domain.user.dto.user;

import com.project.spring.cleanmeet.domain.servicerequest.dto.AnswerProfileDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.CommentProfileDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.CommissionProfileDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileBoardsDto {
    Page<CommissionProfileDto> commissions;
    Page<CommentProfileDto> comments;
    Page<AnswerProfileDto> answers;

    public ProfileBoardsDto(Page<CommissionProfileDto> commissions, Page<CommentProfileDto> comments) {
        this.commissions = commissions;
        this.comments = comments;
    }
}
