package com.project.spring.cleanmeet.domain.user.entity;

import com.project.spring.cleanmeet.common.entity.BaseEntity;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
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
    @Column(nullable = false,name = "is_public")
    private boolean isPublic;
    //회사소개 문구
    @Column(name = "company_introduction")
    private String companyIntroduction;

    @Column(name = "company_contact")
    private String companyContact;
    @Lob // Text 자료형으로 매핑
    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToOne
    @ToString.Exclude
    @JoinColumn(name = "user_id")
    private User user;

    public Company updateDescription(String description) {
        if (this.description == null) {
            throw new IllegalArgumentException("상세내용이 null 값 입니다. description: " + description);
        }
        this.description = description;
        return this;
    }

    public Company updateIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
        return this;
    }

    public static boolean isCompany(CustomUser  customUser) {
        return customUser.getAuthorities().stream()
                .anyMatch(user-> user.getAuthority().equals("ROLE_COMPANY"));
    }

}
