package com.project.spring.cleanmeet.domain.user.mapper;


import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceAnswer;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface ServiceAnswerMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "description", source = "serviceAnswerRequestDto.description")
    @Mapping(target = "serviceCommission", source = "serviceCommission")
    ServiceAnswer toEntity(ServiceAnswerRequestDto serviceAnswerRequestDto, Company company, ServiceCommission serviceCommission);
}
