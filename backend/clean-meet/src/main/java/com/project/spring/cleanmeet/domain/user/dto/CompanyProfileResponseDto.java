package com.project.spring.cleanmeet.domain.user.dto;

import java.util.List;

public class CompanyProfileResponseDto {

    private String description;
    private String companyIntroduction;
    private List<String> tags;
    private boolean isPublic;
    private UserProfileResponseDto userProfile;
}
