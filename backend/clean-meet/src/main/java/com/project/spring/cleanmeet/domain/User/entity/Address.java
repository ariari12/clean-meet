package com.project.spring.cleanmeet.domain.User.entity;


import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "address_name")
    private String addressName;
    @Column(name = "region_1depth_name")
    private String region1DepthName;
    @Column(name = "region_2depth_name")
    private String region2DepthName;
    @Column(name = "region_3depth_name")
    private String region3DepthName;
    @Column(name = "road_name")
    private String roadName;
    @Column(name = "main_building_no")
    private String mainBuildingNo;
    @Column(name = "sub_building_no")
    private String subBuildingNo;
    @Column(name = "zone_no")
    private String zoneNo;

}
