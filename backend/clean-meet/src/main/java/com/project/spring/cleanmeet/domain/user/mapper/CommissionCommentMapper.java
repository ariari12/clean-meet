package com.project.spring.cleanmeet.domain.user.mapper;
import com.project.spring.cleanmeet.domain.servicerequest.entity.CommissionComment;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = false))
public interface CommissionCommentMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "description", source = "description")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "serviceCommission", source = "serviceCommission")
    @Mapping(target = "parentComment", source = "parentComment")
    CommissionComment toEntity(String description, ServiceCommission serviceCommission,
                               User user, CommissionComment parentComment);
}
