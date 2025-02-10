package com.project.spring.cleanmeet.domain.servicerequest.controller;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceCommissionRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceCommissionResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceCommissionService;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceAnswerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service")
public class ServiceCommissionApiController {
    private final ServiceCommissionService serviceCommissionService;
    private final ServiceAnswerService serviceAnswerService;

    @Operation(summary = "서비스 요청 목록",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/commission/all")
    public ResponseEntity<List<ServiceCommissionResponseDto>> commissionAll() {
        List<ServiceCommissionResponseDto> list = serviceCommissionService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @Operation(summary = "서비스 요청 의뢰",
            description = "서비스 카테고리 = 'OFFICE_CLEANING','HOME_CLEANING','MOVE_CLEANING','WINDOW_CLEANING'",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/commission")
    public ResponseEntity<String> request(@RequestBody ServiceCommissionRequestDto serviceCommissionRequestDto) {
        serviceCommissionService.save(serviceCommissionRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "서비스 의뢰 응답", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/answer")
    public ResponseEntity<String> response(@RequestBody ServiceAnswerRequestDto serviceAnswerRequestDto) {
        serviceAnswerService.save(serviceAnswerRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
