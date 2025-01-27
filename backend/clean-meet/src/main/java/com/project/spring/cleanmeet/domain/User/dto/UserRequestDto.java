package com.project.spring.cleanmeet.domain.User.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {
    private String email;
    private String password;
    private String name;
    private String contact;
    private AddressRequestDto addressRequestDto;
}
