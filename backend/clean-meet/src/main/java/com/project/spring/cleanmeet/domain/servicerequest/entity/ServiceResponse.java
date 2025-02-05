package com.project.spring.cleanmeet.domain.servicerequest.entity;

import com.project.spring.cleanmeet.common.entity.BaseEntity;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ServiceResponse extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "scheduled_date_time")
    private LocalDateTime scheduledDateTime;

    @Enumerated
    @Column(name = "service_status")
    private ServiceStatus serviceStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_request")
    private ServiceRequest serviceRequest;

}
