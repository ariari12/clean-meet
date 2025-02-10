package com.project.spring.cleanmeet.domain.servicerequest.entity;

import com.project.spring.cleanmeet.common.entity.BaseEntity;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ServiceAnswer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "scheduled_date_time")
    private LocalDateTime scheduledDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "service_status")
    private ServiceStatus serviceStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_commission")
    private ServiceCommission serviceCommission;

    public void updateStatus(ServiceStatus serviceStatus) {
        if(serviceStatus == null){
            throw new IllegalArgumentException("ServiceStatus can not be null");
        }
        this.serviceStatus = serviceStatus;
    }
}
