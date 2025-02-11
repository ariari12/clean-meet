package com.project.spring.cleanmeet.common.security.jwt.service;

import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import com.project.spring.cleanmeet.domain.user.entity.User;
import com.project.spring.cleanmeet.domain.user.repository.CompanyRepository;
import com.project.spring.cleanmeet.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("로그인 정보 확인 : {}", email);
        //DB에서 username을 가진 유저를 찾아와서
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(email + "이란 이메일이 없습니다"));

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().name()));
        //return new User(유저아이디, 비번, 권한) 해주세요
        //return new User(member.getUsername(), member.getPassword(),grantedAuthorities);
        CustomUser customUser = new CustomUser(user.getEmail(), user.getPassword(), grantedAuthorities);

        // 역할에 따라 이름 설정
        updateName(user, customUser);
        customUser.setId(user.getId().toString());
        log.info("로그인한 유저 찾기 성공 " + customUser);
        return customUser;
    }

    private void updateName(User user, CustomUser customUser) {
        if(user.getRole().name().equals("ROLE_COMPANY")){
            Company company = companyRepository.findByUserId(user.getId()).orElseThrow(
                    () -> new IllegalArgumentException("존재하지 않는 유저 id : " + user.getId())
            );
            customUser.setName(company.getCompanyName());
        }else {
            customUser.setName(user.getName());
        }
    }


}

