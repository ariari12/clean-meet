package com.project.spring.cleanmeet.domain.User.conrotller;
import com.project.spring.cleanmeet.domain.User.dto.CompanyRequestDto;
import com.project.spring.cleanmeet.domain.User.dto.UserRequestDto;
import com.project.spring.cleanmeet.domain.User.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserApiController {
    private final UserService userService;


    @Operation(
            summary = "회원가입",
            description = "새로운 사용자를 등록합니다."
    )
    @PostMapping
    public ResponseEntity<String> users(@RequestBody UserRequestDto userRequestDto) {
        userService.personalSave(userRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(
            summary = "기업 회원가입",
            description = "새로운 기업 사용자를 등록합니다."
    )
    @PostMapping("/company")
    public ResponseEntity<String> company(@RequestBody CompanyRequestDto companyRequestDto) {
        userService.companySave(companyRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
