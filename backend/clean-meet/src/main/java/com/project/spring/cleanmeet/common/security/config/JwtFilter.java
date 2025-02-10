package com.project.spring.cleanmeet.common.security.config;

import com.project.spring.cleanmeet.common.security.jwt.JwtUtil;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwtToken = authorizationHeader.substring(7);  // "Bearer " 제거

        Claims claims;
        try{
            claims = jwtUtil.extractToken(jwtToken);
        }catch (Exception e){
            filterChain.doFilter(request, response);
            return;
        }

        List<String> list = claims.get("authorities", List.class);
        List<SimpleGrantedAuthority> authorities = list.stream().map(SimpleGrantedAuthority::new).toList();

        CustomUser customUser = new CustomUser(
                claims.get("username").toString(),
                "none", // 비밀번호자리이나 토큰정보에는 패스워드를 넣지않았으므로 null값
                authorities
        );
        customUser.setName(claims.get("name").toString());
        customUser.setId(claims.get("id").toString());

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                // 유저네임, 패스워드
                customUser,
                null,
                authorities
        );
        authToken.setDetails(new WebAuthenticationDetailsSource()
                .buildDetails(request));

        //jwt는 이미 검증된 작업으로 authenticationManagerBuilder.getObject().authenticate(authToken); 생략 가능
        SecurityContextHolder.getContext().setAuthentication(authToken);
//        System.out.println("auth = " + SecurityContextHolder.getContext().getAuthentication());

        //실행할 코드
        filterChain.doFilter(request, response);

    }
}
