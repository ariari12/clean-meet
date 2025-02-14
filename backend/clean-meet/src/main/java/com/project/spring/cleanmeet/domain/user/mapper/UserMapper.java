package com.project.spring.cleanmeet.domain.user.mapper;

import com.project.spring.cleanmeet.domain.user.dto.UserProfileResponseDto;
import com.project.spring.cleanmeet.domain.user.dto.UserRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",builder = @Builder(disableBuilder = false))
public interface UserMapper {
    User toEntity(UserRequestDto userRequestDto);

    @Mapping(target = "addressName", source = "address.addressName")
    UserProfileResponseDto toUserProfile(User user);

}
