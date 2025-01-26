package com.project.spring.cleanmeet.domain.User.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address_name;
    private String region_1depth_name;
    private String region_2depth_name;
    private String region_3depth_name;
    private String road_name;
    private String main_building_no;
    private String sub_building_no;
    private String zone_no;

}
