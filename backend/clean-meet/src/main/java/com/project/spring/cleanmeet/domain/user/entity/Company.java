package com.project.spring.cleanmeet.domain.user.entity;

import com.project.spring.cleanmeet.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Company extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "business_number")
    private String businessNumber;
    @Column(name = "company_name")
    private String companyName;
    @Column(name = "service_area")
    private String serviceArea;

    @Column(name = "company_contact")
    private String companyContact;
    @Lob // Text 자료형으로 매핑
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "logo_url")
    private String logoUrl;

    @OneToOne
    @ToString.Exclude
    @JoinColumn(name = "user_id")
    private User user;

}
