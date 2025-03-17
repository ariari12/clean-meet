package com.project.spring.cleanmeet.domain.servicerequest.mapper;


import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerListResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceAnswer;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface ServiceAnswerMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "title", source = "serviceAnswerRequestDto.title")
    @Mapping(target = "description", source = "serviceAnswerRequestDto.description")
    @Mapping(target = "serviceCommission", source = "serviceCommission")
    ServiceAnswer toEntity(ServiceAnswerRequestDto serviceAnswerRequestDto, Company company, ServiceCommission serviceCommission);

    ServiceAnswerListResponseDto toAnswerList(List<ServiceAnswerRequestDto> readAnswers,
                                              List<ServiceAnswerRequestDto> unreadAnswers);


    @Mapping(target = "companyId", source = "serviceAnswer.company.id")
    @Mapping(target = "serviceCommissionId", source = "serviceAnswer.serviceCommission.id")
    ServiceAnswerRequestDto toRequestDto(ServiceAnswer serviceAnswer);


}
