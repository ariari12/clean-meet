package com.project.spring.cleanmeet.domain.user.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileRequestDto {
    private String name;
    private String contact;
    private String s3Key;
    private AddressRequestDto addressRequestDto;
}
