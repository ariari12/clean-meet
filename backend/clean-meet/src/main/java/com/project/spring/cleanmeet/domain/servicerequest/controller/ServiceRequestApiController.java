package com.project.spring.cleanmeet.domain.servicerequest.controller;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service")
public class ServiceRequestApiController {
    private final ServiceRequestService serviceRequestService;

    @PostMapping("/request")
    @Operation(summary = "서비스 요청 의뢰",
            description = "서비스 카테고리 = 'OFFICE_CLEANING','HOME_CLEANING','MOVE_CLEANING','WINDOW_CLEANING'",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<String> request(@RequestBody ServiceRequestDto serviceRequestDto) {
        serviceRequestService.save(serviceRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
