package com.project.spring.cleanmeet.domain.servicerequest.dto;

import com.project.spring.cleanmeet.domain.servicecategory.dto.ServiceCategoryResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CommissionPageResponseDto {
    private Long id;
    private String title;
    private LocalDateTime createdAt;
    private ServiceStatus serviceStatus;
    private ServiceCategoryResponseDto serviceCategoryResponseDto;

}
