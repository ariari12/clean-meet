package com.project.spring.cleanmeet.domain.servicerequest.controller;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceResponseDto;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceRequestService;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceResponseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service")
public class ServiceRequestApiController {
    private final ServiceRequestService serviceRequestService;
    private final ServiceResponseService serviceResponseService;

    @Operation(summary = "서비스 요청 의뢰",
            description = "서비스 카테고리 = 'OFFICE_CLEANING','HOME_CLEANING','MOVE_CLEANING','WINDOW_CLEANING'",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/request")
    public ResponseEntity<String> request(@RequestBody ServiceRequestDto serviceRequestDto) {
        serviceRequestService.save(serviceRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @Operation(summary = "서비스 의뢰 응답", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/response")
    public ResponseEntity<String> response(@RequestBody ServiceResponseDto serviceResponseDto) {
        serviceResponseService.save(serviceResponseDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
