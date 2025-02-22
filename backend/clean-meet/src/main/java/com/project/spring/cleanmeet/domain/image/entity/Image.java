package com.project.spring.cleanmeet.domain.image.entity;

import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder
@ToString
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String s3Key;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JoinColumn(name = "service_commission_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceCommission serviceCommission;

    public Image updateS3Key(String s3Key) {
        if (s3Key != null && !s3Key.equals(this.s3Key)) {
            this.s3Key = s3Key;
        }
        return this;
    }

    public static Image of(String s3Key, User user, ServiceCommission serviceCommission) {
        return Image.builder()
                .user(user)
                .s3Key(s3Key)
                .serviceCommission(serviceCommission)
                .build();
    }
}
