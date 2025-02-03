package com.project.spring.cleanmeet.domain.User.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRequestDto {
    private String businessNumber;
    private String companyName;
    private String serviceArea;
    private String description;
    private String companyContact;
    private List<ServiceCategoryRequestDto> serviceCategory;
    private UserRequestDto userRequestDto;
}
