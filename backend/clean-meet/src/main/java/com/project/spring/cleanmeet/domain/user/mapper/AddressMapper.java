package com.project.spring.cleanmeet.domain.user.mapper;

import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface AddressMapper {
    Address toEntity(AddressRequestDto addressRequestDto);
    AddressRequestDto toAddressRequestDto(Address address);
}
