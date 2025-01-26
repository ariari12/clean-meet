package com.project.spring.cleanmeet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CleanMeetApplication {

    public static void main(String[] args) {
        SpringApplication.run(CleanMeetApplication.class, args);
    }

}
