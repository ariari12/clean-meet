package com.project.spring.cleanmeet.domain.user.conrotller;
import com.project.spring.cleanmeet.domain.user.dto.CompanyCardPageResponse;
import com.project.spring.cleanmeet.domain.user.dto.CompanyRequestDto;
import com.project.spring.cleanmeet.domain.user.dto.UserRequestDto;
import com.project.spring.cleanmeet.domain.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserApiController {
    private final UserService userService;


    @Operation(
            summary = "회원가입",
            description = "새로운 사용자를 등록합니다."
    )
    @PostMapping
    public ResponseEntity<String> users(@RequestBody UserRequestDto userRequestDto) {
        userService.personalSave(userRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(
            summary = "기업 회원가입",
            description = "새로운 기업 사용자를 등록합니다. " +
                    "서비스 카테고리 = 'OFFICE_CLEANING','HOME_CLEANING','MOVE_CLEANING','WINDOW_CLEANING'"
    )
    @PostMapping("/company")
    public ResponseEntity<String> company(@RequestBody CompanyRequestDto companyRequestDto) {
        userService.companySave(companyRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(
            summary = "기업 카드 목록 페이지",
            description = """
                    페이징된 회사 카드 목록을 조회합니다.
                    정렬기능은 안넣었음
                    """
    )
    @GetMapping("/company/page")
    public ResponseEntity<Page<CompanyCardPageResponse>> companyPage(
            @ParameterObject
            @PageableDefault(page = 0, size = 20)
            Pageable pageable) {
        Page<CompanyCardPageResponse> page = userService.findCompanyAllPage(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(page);
    }

}
