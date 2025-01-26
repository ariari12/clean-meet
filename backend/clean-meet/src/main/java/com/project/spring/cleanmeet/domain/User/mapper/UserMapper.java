package com.project.spring.cleanmeet.domain.User.mapper;

import com.project.spring.cleanmeet.domain.User.dto.UserRequestDto;
import com.project.spring.cleanmeet.domain.User.entity.User;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",builder = @Builder(disableBuilder = false))
public interface UserMapper {
    User toEntity(UserRequestDto userRequestDto);
    UserRequestDto toUserRequestDto(User user);
}
