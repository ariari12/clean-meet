package com.project.spring.cleanmeet.domain.user.mapper;

import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceCommissionRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceCommissionResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface ServiceCommissionMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "serviceCategory", source = "serviceCategory")
    ServiceCommission toEntity(ServiceCommissionRequestDto serviceCommissionRequestDto,
                               User user, Address address, ServiceCategory serviceCategory);

    ServiceCommissionResponseDto toDto(ServiceCommission serviceCommission);
}
