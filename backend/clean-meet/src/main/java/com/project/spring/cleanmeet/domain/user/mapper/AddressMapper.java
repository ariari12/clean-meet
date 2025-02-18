package com.project.spring.cleanmeet.domain.user.mapper;

import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface AddressMapper {
    @Mapping(target = "id", ignore = true)
    Address toEntity(AddressRequestDto addressRequestDto, User user);

    Address toEntity(AddressRequestDto addressRequestDto);
    AddressRequestDto toAddressRequestDto(Address address);
}
