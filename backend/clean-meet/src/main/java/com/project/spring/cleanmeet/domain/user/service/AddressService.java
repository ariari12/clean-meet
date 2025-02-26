package com.project.spring.cleanmeet.domain.user.service;


import com.project.spring.cleanmeet.domain.user.dto.AddressRequestDto;
import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import com.project.spring.cleanmeet.domain.user.mapper.AddressMapper;
import com.project.spring.cleanmeet.domain.user.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(propagation = Propagation.REQUIRED)
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;

    public void updateAddress(AddressRequestDto dto, Long userId) {
        if(dto != null) {
            Address address = addressRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException("유저의 주소가 없습니다. userId=" + userId));
            address.updateAddress(dto);
            log.info("주소 정보 수정 완료 ");
        }else{
            log.info("AddressRequestDto 가 null 값 수정 안함");
        }
    }

    public Address getAddress(Long userId) {
        Address address = addressRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저의 주소가 없습니다. userId=" + userId));
        log.info("주소 조회 완료 address = {}", address);
        return address;
    }

    public void getSavedAddress(AddressRequestDto addressRequestDto, User user) {
        Address address = addressMapper.toEntity(addressRequestDto, user);
        Address savedAddress = addressRepository.save(address);
        log.info("주소 저장 완료 : {}", savedAddress);
    }
}
