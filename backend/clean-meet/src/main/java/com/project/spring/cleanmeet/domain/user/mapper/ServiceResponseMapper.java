package com.project.spring.cleanmeet.domain.user.mapper;


import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceRequest;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceResponse;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface ServiceResponseMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "description", source = "serviceResponseDto.description")
    @Mapping(target = "serviceRequest", source = "serviceRequest")
    ServiceResponse toEntity(ServiceResponseDto serviceResponseDto, Company company, ServiceRequest serviceRequest);
}
