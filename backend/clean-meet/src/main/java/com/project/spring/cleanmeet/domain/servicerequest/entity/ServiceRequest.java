package com.project.spring.cleanmeet.domain.servicerequest.entity;

import com.project.spring.cleanmeet.common.entity.BaseEntity;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import jakarta.persistence.*;

@Entity
public class ServiceRequest extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated
    @Column(name = "service_status")
    private ServiceStatus serviceStatus;

    // 서비스 받을 주소
    @JoinColumn(name = "address_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Address address;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JoinColumn(name = "service_category")
    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceCategory serviceCategory;

}
