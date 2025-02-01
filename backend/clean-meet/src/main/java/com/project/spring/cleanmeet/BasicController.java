package com.project.spring.cleanmeet;

import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
public class BasicController {
    @GetMapping("/")
    String hello(Authentication authentication) {
        CustomUser customUser=(CustomUser) authentication.getPrincipal();
        log.info(customUser.toString());
        log.info(customUser.getUsername());
        log.info(customUser.getPassword());
        log.info(customUser.getName());
        log.info("{}",customUser.getId());
        log.info("{}",customUser.getAuthorities());

        return "index";
    }

    @GetMapping("/about")
    @ResponseBody
    String about(){
        return "hello";
    }
}
