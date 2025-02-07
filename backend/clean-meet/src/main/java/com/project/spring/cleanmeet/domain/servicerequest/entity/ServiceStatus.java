package com.project.spring.cleanmeet.domain.servicerequest.entity;

import lombok.Getter;

@Getter
public enum ServiceStatus {
    PENDING("대기중"), APPROVED("승인"), REJECTED("거부"), COMPLETE("완료");

    private final String status;

    ServiceStatus(String status) {
        this.status = status;
    }
}
