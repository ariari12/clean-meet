package com.project.spring.cleanmeet.common.util;

import com.project.spring.cleanmeet.common.model.PreSignedResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.io.File;
import java.time.Duration;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Component {

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;
    private final S3Presigner s3Presigner;
    private final S3Client s3Client;

    public PreSignedResponseDto createPreSignedUrl(String path, String fileName, String userId) {
        log.info("preSignedUrl 생성 시작 path={}, fileName={}, userId={}", path, fileName, userId);
        String uniqueFileName = fileName + "/" + userId;
        String uniquePath = path + "/" + uniqueFileName;

        var putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(uniquePath)
                .build();
        var preSignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(3))
                .putObjectRequest(putObjectRequest)
                .build();
        String preSignedUrl = s3Presigner.presignPutObject(preSignRequest).url().toString();

        return PreSignedResponseDto.builder()
                .preSignedUrl(preSignedUrl)
                .s3Key(uniquePath)
                .build();
    }

}
