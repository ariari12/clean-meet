package com.project.spring.cleanmeet.domain.image;
import lombok.Getter;


@Getter
public enum Category {
    PROFILE("profile");
    private final String value;
    Category(String value) {
        this.value = value;
    }
}
