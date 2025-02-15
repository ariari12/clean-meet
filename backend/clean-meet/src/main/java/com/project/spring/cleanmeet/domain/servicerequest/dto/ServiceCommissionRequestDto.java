package com.project.spring.cleanmeet.domain.servicerequest.dto;
import com.project.spring.cleanmeet.domain.servicecategory.dto.ServiceCategoryRequestDto;
import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceCommissionRequestDto {

    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private AddressRequestDto addressRequestDto;
    private ServiceCategoryRequestDto serviceCategory;
}
