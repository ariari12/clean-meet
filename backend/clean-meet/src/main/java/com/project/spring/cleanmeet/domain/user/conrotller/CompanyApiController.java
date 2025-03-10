package com.project.spring.cleanmeet.domain.user.conrotller;

import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerListResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceAnswerService;
import com.project.spring.cleanmeet.domain.user.dto.company.*;
import com.project.spring.cleanmeet.domain.user.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/companies")
public class CompanyApiController {
    private final CompanyService companyService;
    private final ServiceAnswerService serviceAnswerService;

    @Operation(
            summary = "기업 회원가입",
            description = "새로운 기업 사용자를 등록합니다. " +
                    "서비스 카테고리 = 'OFFICE_CLEANING','HOME_CLEANING','MOVE_CLEANING','WINDOW_CLEANING'"
    )
    @PostMapping
    public ResponseEntity<String> company(@RequestBody CompanyRequestDto companyRequestDto) {
        companyService.companySave(companyRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(
            summary = "기업 카드 목록 페이지",
            description = """
                    페이징된 회사 카드 목록을 조회합니다.
                    정렬기능은 안넣었음
                    """
    )
    @GetMapping("/list")
    public ResponseEntity<Page<CompanyCardPageResponse>> companyPage(
            @ParameterObject
            @PageableDefault(page = 0, size = 20)
            Pageable pageable) {
        Page<CompanyCardPageResponse> page = companyService.findCompanyAllPage(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(page);
    }


    @Operation(
            summary = "프로필 회사 정보 조회",
            description = """
                    - 회사 권한이 있는 유저만 가능
                    - 로그인 된 회사 프로필 조회
                    - S3 이미지 조회요청은 아래 URL로
                    - 도커 컴포즈 환경 `http://localhost/images/{S3_KEY}`
                    - 로컬 환경 `https://cleanmeetbucket.s3.ap-northeast-2.amazonaws.com/{S3_KEY}`
                    """,
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/profile")
    public ResponseEntity<CompanyProfileResponseDto> getCompanyProfile(Authentication auth) {
        CompanyProfileResponseDto dto = companyService.findCompanyProfile(auth);

        return ResponseEntity.ok(dto);
    }

    @Operation(summary = "프로필 받은 문의 응답 목록",
            description = "의뢰 응답을 레디스에서 가져옵니다.",
            security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/profile/messages")
    public ResponseEntity<ServiceAnswerListResponseDto> responseRedisList(Authentication auth) {
        ServiceAnswerListResponseDto answers = serviceAnswerService.findAnswers(auth);
        return ResponseEntity.status(HttpStatus.OK).body(answers);
    }

    @Operation(
            summary = "회사 상세내용 업데이트",
            description = "회사 권한이 있는 유저만 가능"
    )
    @PutMapping("/profile/description")
    public ResponseEntity<CompanyDescriptionResponseDto> companyDescriptionUpdate(
            @RequestBody CompanyDescriptionRequestDto companyDescriptionRequestDto,
            Authentication auth) {
        CompanyDescriptionResponseDto dto = companyService.updateDescription(companyDescriptionRequestDto, auth);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @Operation(
            summary = "회사 태그 추가",
            description = "회사 권한이 있는 유저만 가능"
    )
    @PutMapping("/profile/tags")
    public ResponseEntity<CompanyTagsResponseDto> companyAddTags(@RequestBody CompanyTagsRequestDto companyTagsRequestDto,
                                                 Authentication auth) {

        CompanyTagsResponseDto companyTagsResponseDto = companyService.updateTags(companyTagsRequestDto, auth);
        return ResponseEntity.status(HttpStatus.OK).body(companyTagsResponseDto);
    }

    @Operation(
            summary = "회사 목록 노출 여부",
            description = "회사 권한이 있는 유저만 가능"
    )
    @PutMapping("/profile/visibility")
    public ResponseEntity<CompanyVisibilityResponseDto> updateVisibility(
            @RequestBody CompanyVisibilityRequestDto companyVisibilityRequestDto,
            Authentication auth) {
        CompanyVisibilityResponseDto dto = companyService.updateVisibility(companyVisibilityRequestDto, auth);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}
