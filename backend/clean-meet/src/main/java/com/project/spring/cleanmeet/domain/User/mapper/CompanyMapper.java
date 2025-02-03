package com.project.spring.cleanmeet.domain.User.mapper;

import com.project.spring.cleanmeet.domain.User.dto.CompanyRequestDto;
import com.project.spring.cleanmeet.domain.User.entity.Company;
import com.project.spring.cleanmeet.domain.User.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface CompanyMapper {
    @Mapping(target = "id", ignore = true)
    Company toEntity(CompanyRequestDto companyRequestDto, User user);
}
