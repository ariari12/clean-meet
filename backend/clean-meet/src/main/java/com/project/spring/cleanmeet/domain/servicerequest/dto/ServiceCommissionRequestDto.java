package com.project.spring.cleanmeet.domain.servicerequest.dto;
import com.project.spring.cleanmeet.domain.servicecategory.dto.ServiceCategoryRequestDto;
import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceCommissionRequestDto {

    private String title;
    private String description;
    private Long userId;
    private AddressRequestDto addressRequestDto;
    private ServiceCategoryRequestDto serviceCategory;
}
