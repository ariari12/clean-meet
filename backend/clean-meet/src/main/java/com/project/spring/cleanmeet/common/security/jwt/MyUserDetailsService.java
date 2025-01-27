package com.project.spring.cleanmeet.common.security.jwt;

import com.project.spring.cleanmeet.domain.User.entity.User;
import com.project.spring.cleanmeet.domain.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    public static Object CustomUser;
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //DB에서 username을 가진 유저를 찾아와서
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(email + "이란 이메일이 없습니다"));

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().name()));
        //return new User(유저아이디, 비번, 권한) 해주세요
        //return new User(member.getUsername(), member.getPassword(),grantedAuthorities);
        CustomUser customUser = new CustomUser(user.getEmail(), user.getPassword(), grantedAuthorities);
        customUser.setName(user.getName());
        customUser.setId(user.getId());
        return customUser;
    }


}

