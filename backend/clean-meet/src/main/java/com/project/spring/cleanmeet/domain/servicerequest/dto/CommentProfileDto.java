package com.project.spring.cleanmeet.domain.servicerequest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentProfileDto {
    private Long id;
    private String description;
    private LocalDateTime createdAt;
}
