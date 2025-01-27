package com.project.spring.cleanmeet.domain.User.conrotller;
import com.project.spring.cleanmeet.domain.User.dto.UserRequestDto;
import com.project.spring.cleanmeet.domain.User.service.UserService;

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
public class UserController {
    private final UserService userService;


    @PostMapping
    public ResponseEntity<String> users(@RequestBody UserRequestDto userRequestDto) {
        Long userId = userService.save(userRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("UserId: " + userId);
    }

}
