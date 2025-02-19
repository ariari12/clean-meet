package com.project.spring.cleanmeet.domain.servicerequest.controller;
import com.project.spring.cleanmeet.domain.servicerequest.dto.*;
import com.project.spring.cleanmeet.domain.servicerequest.service.CommissionCommentService;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceCommissionService;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceAnswerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service")
public class ServiceCommissionApiController {
    private final ServiceCommissionService serviceCommissionService;
    private final ServiceAnswerService serviceAnswerService;
    private final CommissionCommentService commissionCommentService;

    @Operation(
            summary = "서비스 의뢰 상세 조회",
            description = "의뢰 상세 조회 페이지"
    )
    @GetMapping("/request/{id}")
    public ResponseEntity<ServiceCommissionResponseDto> getServiceCommission(
            @PathVariable Long id) {
        ServiceCommissionResponseDto dto = serviceCommissionService.findCommissionDetailById(id);
        return ResponseEntity.ok(dto);
    }

    @Operation(
            summary = "서비스 요청 목록",
            description = """
                페이징 및 정렬을 적용하여 서비스 요청 목록을 조회합니다.
                - `sort` 파라미터는 원하는 정렬 방향을 포함해야 합니다.
                - 기본값이 설정되어 있어 생략해도 상관없습니다.
                - 예시: `/api/commission/page?sort=createdAt,desc`
                """,
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/page")
    public ResponseEntity<Page<CommissionPageResponseDto>> commissionAll(
            @ParameterObject
            @PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        Page<CommissionPageResponseDto> page = serviceCommissionService.findAllPage(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(page);
    }

    @Operation(summary = "서비스 요청 의뢰",
            description = "서비스 카테고리 = 'OFFICE_CLEANING','HOME_CLEANING','MOVE_CLEANING','WINDOW_CLEANING'",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/commission")
    public ResponseEntity<String> request(@RequestBody ServiceCommissionRequestDto serviceCommissionRequestDto,
                                          Authentication authentication) {
        serviceCommissionService.save(serviceCommissionRequestDto,authentication);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "서비스 의뢰 응답",
            description = "회사 유저만 가능",
            security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/answer")
    public ResponseEntity<String> response(@RequestBody ServiceAnswerRequestDto serviceAnswerRequestDto) {
        serviceAnswerService.save(serviceAnswerRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(
            summary = "서비스 의뢰 댓글 생성",
            description = """                    
                    - parentId null 값인 경우 부모 댓글 생성
                    - parentId 에 값이 있을 경우 자식 댓글 생성
                    """
    )
    @PostMapping("/comments/{commissionId}")
    public ResponseEntity<String> commissionComment(
            @PathVariable Long commissionId, Authentication auth,
            @RequestBody CommissionCommentRequestDto dto) {
        commissionCommentService.save(commissionId, auth, dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
