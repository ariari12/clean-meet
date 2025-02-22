package com.project.spring.cleanmeet.domain.servicerequest.mapper;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ChildCommentResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ParentCommentResponseDto;
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


    @Mapping(target = "id", source = "commissionComment.id")
    @Mapping(target = "parentId", source = "commissionComment.parentComment.id")
    @Mapping(target = "userId", source = "commissionComment.user.id")
    @Mapping(target = "name", source = "commissionComment.user.name" )
    @Mapping(target = "description", source = "commissionComment.description")
    @Mapping(target = "createdAt", source = "commissionComment.createdAt")
    @Mapping(target = "updatedAt", source = "commissionComment.updatedAt")
    ChildCommentResponseDto toChildCommentDto(CommissionComment commissionComment);

    @Mapping(target = "id", source = "commissionComment.id")
    @Mapping(target = "userId", source = "commissionComment.user.id")
    @Mapping(target = "name", source = "commissionComment.user.name" )
    @Mapping(target = "description", source = "commissionComment.description")
    @Mapping(target = "createdAt", source = "commissionComment.createdAt")
    @Mapping(target = "updatedAt", source = "commissionComment.updatedAt")
    ParentCommentResponseDto toParentCommentDto(CommissionComment commissionComment);

}
