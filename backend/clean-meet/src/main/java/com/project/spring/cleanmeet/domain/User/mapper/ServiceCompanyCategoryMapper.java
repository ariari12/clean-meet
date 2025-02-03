package com.project.spring.cleanmeet.domain.User.mapper;

import com.project.spring.cleanmeet.domain.User.entity.Company;
import com.project.spring.cleanmeet.domain.User.entity.ServiceCategory;
import com.project.spring.cleanmeet.domain.User.entity.ServiceCompanyCategory;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface ServiceCompanyCategoryMapper {
    @Mapping(target = "id", ignore = true)
    ServiceCompanyCategory toEntity(Company company, ServiceCategory serviceCategory);

}
