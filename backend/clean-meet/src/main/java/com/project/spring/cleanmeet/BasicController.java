package com.project.spring.cleanmeet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BasicController {
    @GetMapping("/")
    String hello(){
        System.out.println("asdasdasd");
        return "index";
    }

    @GetMapping("/about")
    @ResponseBody
    String about(){
        return "hello";
    }
}
