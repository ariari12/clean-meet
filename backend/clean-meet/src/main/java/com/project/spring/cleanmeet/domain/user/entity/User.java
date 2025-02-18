package com.project.spring.cleanmeet.domain.user.entity;
import com.project.spring.cleanmeet.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Table(name = "users")
@Getter
@Entity
@Builder
@ToString
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String name;
    private String contact;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void updateRole(Role role) {
        if(role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }
        this.role = role;
    }
    public void encodePassword(PasswordEncoder passwordEncoder, String password) {
        if(role == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        this.password = passwordEncoder.encode(password);
    }
}
