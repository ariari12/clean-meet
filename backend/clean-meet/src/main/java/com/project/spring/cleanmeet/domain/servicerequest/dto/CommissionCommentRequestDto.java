package com.project.spring.cleanmeet.domain.servicerequest.dto;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommissionCommentRequestDto {
    @Nullable
    private Long parentId;
    private String description;
}
