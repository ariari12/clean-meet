package com.project.spring.cleanmeet.domain.servicerequest.dto;
import com.project.spring.cleanmeet.domain.servicecategory.dto.ServiceCategoryRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceCommissionResponseDto {

    private String title;

    private ServiceCategoryRequestDto serviceCategory;

    private String description;

    private String region1DepthName;

    private String region2DepthName;

    private String region3DepthName;

    private LocalDate startDate;

    private LocalDate endDate;

    private ServiceStatus serviceStatus;

    private String comment;

}
