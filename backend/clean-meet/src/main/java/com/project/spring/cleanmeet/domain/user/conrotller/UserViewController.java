package com.project.spring.cleanmeet.domain.user.conrotller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserViewController {

    @GetMapping("/users")
    public String users() {
        return "user-register";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
