package com.project.spring.cleanmeet.domain.User.conrotller;

import com.project.spring.cleanmeet.common.security.jwt.CustomUser;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserViewController {

    @GetMapping("/users")
    public String users(Authentication authentication) {
        CustomUser customUser = (CustomUser) authentication.getPrincipal();
        System.out.println("customUser = " + customUser.getName());
        System.out.println("customUser = " + customUser.getAuthorities());
        System.out.println("customUser = " + customUser.getUsername());
        System.out.println("customUser = " + customUser.getId());
        return "user-register";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
