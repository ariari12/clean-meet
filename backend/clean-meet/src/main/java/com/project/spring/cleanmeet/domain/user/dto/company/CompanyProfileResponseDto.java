package com.project.spring.cleanmeet.domain.user.dto.company;

import com.project.spring.cleanmeet.domain.user.dto.user.UserProfileResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyProfileResponseDto {

    private String companyName;
    private String businessNumber;
    private String description;
    private String serviceArea;
    private String companyIntroduction;
    private String companyContact;
    private boolean isPublic;
    private List<String> tags;
    private UserProfileResponseDto userProfile;
}
