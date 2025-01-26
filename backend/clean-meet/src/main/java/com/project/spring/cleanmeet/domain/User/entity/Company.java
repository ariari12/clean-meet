package com.project.spring.cleanmeet.domain.User.entity;

import com.project.spring.cleanmeet.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
public class Company extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String business_number;
    private String company_name;
    private String service_area;
    private String service_category;
    @Lob // Text 자료형으로 매핑
    @Column(columnDefinition = "TEXT")
    private String description;
    private String logo_url;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
