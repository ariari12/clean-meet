package com.project.spring.cleanmeet.domain.servicerequest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceAnswerListResponseDto {
    List<ServiceAnswerRequestDto> readAnswers;
    List<ServiceAnswerRequestDto> unreadAnswers;

}
