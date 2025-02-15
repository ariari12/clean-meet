package com.project.spring.cleanmeet.domain.user.mapper;

import com.project.spring.cleanmeet.domain.user.dto.CompanyCardPageResponse;
import com.project.spring.cleanmeet.domain.user.dto.CompanyRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface CompanyMapper {
    @Mapping(target = "id", ignore = true)
    Company toEntity(CompanyRequestDto companyRequestDto, User user);

    CompanyCardPageResponse toDto(Company company);
}
