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
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id")
    private Address address;
    private String role;

    public void updateAddress(Address address) {
        if(address == null) {
            throw new IllegalArgumentException("Address cannot be null");
        }
        this.address = address;
    }
}
