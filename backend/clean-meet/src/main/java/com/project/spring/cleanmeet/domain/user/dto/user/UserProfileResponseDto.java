package com.project.spring.cleanmeet.domain.user.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponseDto {

    private String email;
    private String name;
    private String contact;
    private String addressName;
    private String s3Key;
}
