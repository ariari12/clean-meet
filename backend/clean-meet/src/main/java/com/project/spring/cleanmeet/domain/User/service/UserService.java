package com.project.spring.cleanmeet.domain.User.service;

import com.project.spring.cleanmeet.common.exception.DuplicateEmailException;
import com.project.spring.cleanmeet.domain.User.entity.Role;
import com.project.spring.cleanmeet.domain.User.mapper.AddressMapper;
import com.project.spring.cleanmeet.domain.User.mapper.UserMapper;
import com.project.spring.cleanmeet.domain.User.dto.UserRequestDto;
import com.project.spring.cleanmeet.domain.User.entity.Address;
import com.project.spring.cleanmeet.domain.User.entity.User;
import com.project.spring.cleanmeet.domain.User.repository.AddressRepository;
import com.project.spring.cleanmeet.domain.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final PasswordEncoder passwordEncoder;

    public Long save(UserRequestDto userRequestDto) {

        //중복 회원가입 방지
        isEmailExists(userRequestDto);

        // 주소 저장
        Address address = addressMapper.toEntity(userRequestDto.getAddressRequestDto());
        Address savedAddress = addressRepository.save(address);

        //유저 저장
        User user = userMapper.toEntity(userRequestDto);
        user.updateRole(Role.ROLE_PERSONAL);
        user.updateAddress(savedAddress);
        user.encodePassword(passwordEncoder.encode(userRequestDto.getPassword()));
        User savedUser = userRepository.save(user);

        return savedUser.getId();
    }

    private void isEmailExists(UserRequestDto userRequestDto) {
        Boolean isExist = userRepository.existsByEmail(userRequestDto.getEmail());
        if (isExist) {
            throw new DuplicateEmailException("이미 등록된 이메일입니다: " + userRequestDto.getEmail());
        }
    }

}
