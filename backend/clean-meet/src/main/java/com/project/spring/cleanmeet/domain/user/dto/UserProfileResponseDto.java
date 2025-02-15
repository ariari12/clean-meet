package com.project.spring.cleanmeet.domain.user.dto;

import com.project.spring.cleanmeet.domain.user.entity.Role;
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
    private Role role;
    private String addressName;
}
