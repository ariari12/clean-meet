package com.project.spring.cleanmeet.common.util;

import com.project.spring.cleanmeet.common.model.PreSignedResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import java.time.Duration;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Component {

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;
    private final S3Presigner s3Presigner;

    private static final List<String> ALLOWED_EXTENSIONS = List.of("jpg", "jpeg", "png", "gif", "pdf");

    public PreSignedResponseDto createPreSignedUrl(String path, String fileName, String userId) {
        log.info("preSignedUrl 생성 시작 path={}, fileName={}, userId={}", path, fileName, userId);
        fileName = fileName.trim();

        String validFileName = getValidFileName(fileName, "jpg");

        String uniqueFileName = userId + "/" + validFileName;
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

    private String getValidFileName(String fileName, String defaultExtension) {
        // 마지막 "." 위치 찾기
        int lastDotIndex = fileName.lastIndexOf(".");

        if (lastDotIndex == -1) {
            // 확장자가 없는 경우 기본 확장자 추가
            return fileName + "." + defaultExtension;
        }

        // 확장자 추출 (소문자로 변환)
        String extension = fileName.substring(lastDotIndex + 1).toLowerCase();

        // 허용된 확장자인지 확인
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            // 허용되지 않은 확장자는 기본 확장자로 변경
            return fileName.substring(0, lastDotIndex) + "." + defaultExtension;
        }

        return fileName;
    }

}
