package com.project.spring.cleanmeet.domain.servicerequest.entity;

import com.project.spring.cleanmeet.common.entity.BaseEntity;
import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ServiceCommission extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "service_status")
    private ServiceStatus serviceStatus;

    // 서비스 받을 주소
    @JoinColumn(name = "address_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Address address;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private User user;

    @JoinColumn(name = "service_category")
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private ServiceCategory serviceCategory;

    public void updateServiceStatus(ServiceStatus serviceStatus) {
        if (serviceStatus == null) {
            throw new IllegalArgumentException("서비스 상태는 null일 수 없습니다.");
        }
        this.serviceStatus = serviceStatus;
    }

}
