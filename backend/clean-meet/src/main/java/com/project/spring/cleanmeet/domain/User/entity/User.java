package com.project.spring.cleanmeet.domain.User.entity;
import com.project.spring.cleanmeet.common.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "users")
@Getter
@Entity
@Builder
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
    @OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "address_id")
    private Address address;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void updateAddress(Address address) {
        if(address == null) {
            throw new IllegalArgumentException("Address cannot be null");
        }
        this.address = address;
    }
    public void updateRole(Role role) {
        if(role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }
        this.role = role;
    }
    public void encodePassword(String password) {
        if(role == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        this.password = password;
    }
}
