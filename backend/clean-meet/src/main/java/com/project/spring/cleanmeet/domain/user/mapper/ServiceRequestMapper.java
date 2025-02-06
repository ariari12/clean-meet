package com.project.spring.cleanmeet.domain.user.mapper;

import com.project.spring.cleanmeet.domain.servicecategory.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceRequest;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface ServiceRequestMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "serviceCategory", source = "serviceCategory")
    ServiceRequest toEntity(ServiceRequestDto serviceRequestDto,
                            User user, Address address, ServiceCategory serviceCategory);
}
