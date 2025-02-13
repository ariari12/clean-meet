package com.project.spring.cleanmeet.domain.user.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyCardPageResponse {
    private Long id;

    private String companyName;

    private String companyIntroduction;

    private String logoUrl;
}
