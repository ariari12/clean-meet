package com.project.spring.cleanmeet.domain.user.dto.user;


import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String email;
    private String password;
    private String name;
    private String contact;
    private AddressRequestDto addressRequestDto;
    private String role;
}
