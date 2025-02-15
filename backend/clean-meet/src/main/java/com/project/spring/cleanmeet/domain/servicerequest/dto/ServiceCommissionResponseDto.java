package com.project.spring.cleanmeet.domain.servicerequest.dto;
import com.project.spring.cleanmeet.domain.servicecategory.dto.ServiceCategoryRequestDto;
import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceCommissionResponseDto {

    private Long id;
    private String title;
    private LocalDateTime createdAt;
    private ServiceCategoryRequestDto serviceCategory;
}
