package com.project.spring.cleanmeet.domain.User.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequestDto {

    private String addressName;
    private String region1DepthName;
    private String region2DepthName;
    private String region3DepthName;
    private String roadName;
    private String mainBuildingNo;
    private String subBuildingNo;
    private String zoneNo;
}
