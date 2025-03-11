package com.project.spring.cleanmeet.domain.user.service;

import com.project.spring.cleanmeet.common.exception.DuplicateEmailException;
import com.project.spring.cleanmeet.common.exception.UserNotFoundException;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.domain.image.entity.Image;
import com.project.spring.cleanmeet.domain.image.repository.ImageRepository;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.servicerequest.repository.ServiceCommissionRepository;
import com.project.spring.cleanmeet.domain.user.dto.user.ProfileBoardsDto;
import com.project.spring.cleanmeet.domain.user.dto.user.UserProfileRequestDto;
import com.project.spring.cleanmeet.domain.user.dto.user.UserProfileResponseDto;
import com.project.spring.cleanmeet.domain.user.dto.user.UserRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.*;
import com.project.spring.cleanmeet.domain.user.mapper.UserMapper;
import com.project.spring.cleanmeet.domain.user.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final ServiceCommissionRepository serviceCommissionRepository;

    private final AddressService addressService;
    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;


    public void personalSave(UserRequestDto userRequestDto) {
        log.info("개인 회원가입 시작: userRequestDto={}", userRequestDto);

        //중복 회원가입 방지
        isEmailExists(userRequestDto.getEmail());

        //유저 저장
        User user = userMapper.toEntity(userRequestDto);
        user.updateRole(Role.ROLE_PERSONAL);
        // 패스워드 검증 및 해싱
        user.encodePassword(passwordEncoder, userRequestDto.getPassword());
        User savedUser = userRepository.save(user);

        // 주소 저장
        addressService.getSavedAddress(userRequestDto.getAddressRequestDto(), user);


        log.info("회원 가입 성공: email={}", savedUser.getEmail());

    }



    private void isEmailExists(String email) {
        Boolean isExist = userRepository.existsByEmail(email);
        if (isExist) {
            throw new DuplicateEmailException("이미 등록된 이메일입니다 " + email);
        }
    }

    public UserProfileResponseDto findUserProfile(Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("유저 프로필 조회 시작 customUser={}", customUser);
        Long userId = Long.parseLong(customUser.getId());

        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("존재하지 않는 유저 id 입니다. userId=" + userId));
        log.info("유저 조회 완료 user={}", user);

        Address address = addressService.getAddress(user.getId());

        Image image = imageRepository.findByUser(user).orElse(null);
        log.info("유저 프로필 사진 조회 완료  image = {}", image);

        UserProfileResponseDto userProfileResponseDto = userMapper.toUserProfile(user, address, image);
        log.info("유저 프로필 조회 완료 UserProfileResponseDto : {}", userProfileResponseDto);
        return userProfileResponseDto;
    }


    public void updateProfile(UserProfileRequestDto dto , Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();

        boolean roleCompany = customUser.getAuthorities().stream().anyMatch(
                grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_COMPANY")
        );

        log.info("유저 프로필 업데이트 시작 dto : {}", dto);
        User user = userRepository.findById(Long.valueOf(customUser.getId()))
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 userId=" + customUser.getId()));
        log.info("유저 조회 성공 user={}", user);

        user.updateProfile(dto.getName(), dto.getContact());
        log.info("유저 정보 수정 완료 updatedUser={}", user);

        addressService.updateAddress(dto.getAddressRequestDto(), user.getId());


        imageRepository.findByUser(user)
                .ifPresentOrElse(
                        img -> {
                            Image updateImage = img.updateS3Key(dto.getS3Key());
                            log.info("이미지 url 수정 완료  image={}", updateImage);
                        }, // 기존 이미지 업데이트
                        () -> {
                            Image newImage = Image.of(dto.getS3Key(), user, null);
                            Image savedImage = imageRepository.save(newImage);// 새로운 이미지 저장
                            log.info("이미지 url 저장 완료   image={}", savedImage);
                        }
                );
        log.info("프로필 업데이트 완료");
    }

    public Page<ProfileBoardsDto> getMyBoards(Authentication auth, Pageable pageable) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();

        boolean isCompany = customUser.getAuthorities().stream()
                .anyMatch(user-> user.getAuthority().equals("ROLE_COMPANY"));
        if (isCompany) {
            // ROLE_COMPANY인 경우 처리
        }
        Page<ServiceCommission> userBoardsPage = serviceCommissionRepository.findUserBoardsPage(pageable, Long.valueOf(customUser.getId()));


        return null;
    }
}
