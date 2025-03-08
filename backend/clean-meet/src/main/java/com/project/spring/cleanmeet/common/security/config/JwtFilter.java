package com.project.spring.cleanmeet.common.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.spring.cleanmeet.common.exception.TokenExpiredException;
import com.project.spring.cleanmeet.common.security.jwt.JwtUtil;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.common.security.jwt.dto.FilterErrorResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {


        log.debug("doFilterInternal 시작");
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwtToken = authorizationHeader.substring(7);  // "Bearer " 제거

        Claims claims;
        try{
            claims = jwtUtil.extractToken(jwtToken);
        } catch (ExpiredJwtException e) {  // JWT 만료 예외
            log.warn("JWT 만료: {}", e.getMessage());
            sendJsonErrorResponse(request, response, HttpServletResponse.SC_UNAUTHORIZED, HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다.");
            return;
        } catch (JwtException e) {  // 다른 JWT 관련 예외
            log.warn("JWT 검증 실패: {}", e.getMessage());
            sendJsonErrorResponse(request, response, HttpServletResponse.SC_UNAUTHORIZED, HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다.");
            return;
        } catch (Exception e) {  // 일반 예외 처리
            log.error("JWT 검증 중 알 수 없는 오류 발생: {}", e.getMessage());
            sendJsonErrorResponse(request, response, HttpServletResponse.SC_FORBIDDEN, HttpStatus.FORBIDDEN, "잘못된 요청입니다.");
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

    private void sendJsonErrorResponse(HttpServletRequest request, HttpServletResponse response,
                                       int statusCode, HttpStatus error, String message) throws IOException {

        FilterErrorResponse filterErrorResponse = new FilterErrorResponse(statusCode, error, message, request.getRequestURI());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(statusCode);
        response.getWriter().write(objectMapper.writeValueAsString(filterErrorResponse));
    }
}
