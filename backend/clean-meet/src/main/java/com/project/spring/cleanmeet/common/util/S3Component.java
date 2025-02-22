package com.project.spring.cleanmeet.common.util;

import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.io.File;
import java.time.Duration;

@Component
@RequiredArgsConstructor
public class S3Component {

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;
    private final S3Presigner s3Presigner;
    private final S3Client s3Client;

    String createPreSignedUrl(String path, String fileName, Authentication auth) {
        String userId = ((CustomUser) auth.getPrincipal()).getId();
        String uniqueFileName = fileName + "-" + userId;
        String uniquePath = path + File.pathSeparator + uniqueFileName;

        var putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(uniquePath)
                .build();
        var preSignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(3))
                .putObjectRequest(putObjectRequest)
                .build();
        String preSignedUrl = s3Presigner.presignPutObject(preSignRequest).url().toString();
        return preSignedUrl;
    }

}
