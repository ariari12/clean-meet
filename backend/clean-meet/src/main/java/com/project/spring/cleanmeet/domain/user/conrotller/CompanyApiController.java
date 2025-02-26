package com.project.spring.cleanmeet.domain.user.conrotller;

import com.project.spring.cleanmeet.domain.user.dto.*;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/companies")
public class CompanyApiController {
    private final CompanyService companyService;

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

    @Operation(
            summary = "회사 상세내용 업데이트"
    )
    @PreAuthorize("hasAuthority('ROLE_COMPANY')")
    @PutMapping("/profile/description")
    public ResponseEntity<String> companyDescriptionUpdate(
            @RequestBody CompanyDescriptionRequestDto companyDescriptionRequestDto,
            Authentication auth) {
//        companyService.updateDescription(companyDescriptionRequestDto, auth);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(
            summary = "회사 태그 추가"
    )
    @PreAuthorize("hasAuthority('ROLE_COMPANY')")
    @PutMapping("/profile/tags")
    public ResponseEntity<String> companyAddTags(Authentication auth, CompanyTagsRequestDto companyTagsRequestDto) {

//        companyService.updateTags(companyTagsRequestDto, auth);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(
            summary = "회사 목록 노출 여부"
    )
    @PreAuthorize("hasAuthority('ROLE_COMPANY')")
    @PutMapping("/profile/visibility")
    public ResponseEntity<String> updateVisibility(
            @RequestBody CompanyVisibilityRequestDto companyVisibilityRequestDto,
            Authentication auth) {
//        companyService.updateVisibility(companyVisibilityRequestDto, auth);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
