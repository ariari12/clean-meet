package com.project.spring.cleanmeet.domain.user.entity;


import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "address_name")
    private String addressName;
    @Column(name = "region1_depth_name")
    private String region1DepthName;
    @Column(name = "region2_depth_name")
    private String region2DepthName;
    @Column(name = "region3_depth_name")
    private String region3DepthName;
    @Column(name = "road_name")
    private String roadName;
    @Column(name = "main_building_no")
    private String mainBuildingNo;
    @Column(name = "sub_building_no")
    private String subBuildingNo;
    @Column(name = "zone_no")
    private String zoneNo;

    @ToString.Exclude
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static Address of(User user) {
        return Address.builder().user(user).build();
    }

    public void updateAddress(AddressRequestDto dto) {

        if (dto.getAddressName() != null && !dto.getAddressName().equals(this.addressName)) {
            this.addressName = dto.getAddressName();
        }
        if (dto.getRegion1DepthName() != null && !dto.getRegion1DepthName().equals(this.region1DepthName)) {
            this.region1DepthName = dto.getRegion1DepthName();
        }
        if (dto.getRegion2DepthName() != null && !dto.getRegion2DepthName().equals(this.region2DepthName)) {
            this.region2DepthName = dto.getRegion2DepthName();
        }
        if (dto.getRegion3DepthName() != null && !dto.getRegion3DepthName().equals(this.region3DepthName)) {
            this.region3DepthName = dto.getRegion3DepthName();
        }
        if (dto.getRoadName() != null && !dto.getRoadName().equals(this.roadName)) {
            this.roadName = dto.getRoadName();
        }
        if (dto.getMainBuildingNo() != null && !dto.getMainBuildingNo().equals(this.mainBuildingNo)) {
            this.mainBuildingNo = dto.getMainBuildingNo();
        }
        if (dto.getSubBuildingNo() != null && !dto.getSubBuildingNo().equals(this.subBuildingNo)) {
            this.subBuildingNo = dto.getSubBuildingNo();
        }
        if (dto.getZoneNo() != null && !dto.getZoneNo().equals(this.zoneNo)) {
            this.zoneNo = dto.getZoneNo();
        }
    }


}
