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
        if(password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        this.password = passwordEncoder.encode(password);
    }

    public void updateProfile(String name, String contact) {
        updateName(name);
        updateContact(contact);
    }

    private void updateContact(String contact) {
        if (contact != null && !contact.equals(this.contact)) {
            this.contact = contact;
        }
    }

    private void updateName(String name) {
        if (name != null && !name.equals(this.name)) {
            this.name = name;
        }
    }

    private void updateEmail(String email) {
        if (email != null && !email.equals(this.email)) {
            this.email = email;
        }
    }

    private void updatePassword(String password, String confirmPassword, PasswordEncoder passwordEncoder) {
        if(password != null && !password.isEmpty()){
            validatePassword(password, confirmPassword);
            encodePassword(passwordEncoder, password);
        }
    }

    private void validatePassword(String password, String confirmPassword) {
        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
    }
}
