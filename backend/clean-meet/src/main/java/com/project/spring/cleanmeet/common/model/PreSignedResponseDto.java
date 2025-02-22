package com.project.spring.cleanmeet.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PreSignedResponseDto {
    private String preSignedUrl;
    private String s3Key;
}
