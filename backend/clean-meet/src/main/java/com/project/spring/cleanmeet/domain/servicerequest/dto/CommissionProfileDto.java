package com.project.spring.cleanmeet.domain.servicerequest.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommissionProfileDto {
    private Long id;
    private String title;
    private LocalDateTime createdAt;
}
