package com.project.spring.cleanmeet.domain.servicerequest.mapper;

import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.servicerequest.dto.CommissionPageResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.CommissionProfileDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceCommissionRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceCommissionResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface ServiceCommissionMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "serviceCategory", source = "serviceCategory")
    @Mapping(target = "user", source = "user")
    ServiceCommission toEntity(ServiceCommissionRequestDto serviceCommissionRequestDto,
                               User user, Address address, ServiceCategory serviceCategory);

    @Mapping(target = "serviceCategoryResponseDto", source = "serviceCategory")
    CommissionPageResponseDto toPageResponseDto(ServiceCommission serviceCommission);


    @Mapping(target = "region1DepthName", source = "address.region1DepthName")
    @Mapping(target = "region2DepthName", source = "address.region2DepthName")
    @Mapping(target = "region3DepthName", source = "address.region3DepthName")
    ServiceCommissionResponseDto toServiceCommissionResponseDto(ServiceCommission serviceCommission);
}
