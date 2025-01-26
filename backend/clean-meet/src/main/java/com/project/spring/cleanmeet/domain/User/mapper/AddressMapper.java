package com.project.spring.cleanmeet.domain.User.mapper;

import com.project.spring.cleanmeet.domain.User.dto.AddressRequestDto;
import com.project.spring.cleanmeet.domain.User.entity.Address;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface AddressMapper {
    Address toEntity(AddressRequestDto addressRequestDto);
    AddressRequestDto toAddressRequestDto(Address address);
}
