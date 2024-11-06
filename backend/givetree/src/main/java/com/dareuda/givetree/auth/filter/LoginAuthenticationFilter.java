package com.dareuda.givetree.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import java.io.IOException;

public class LoginAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    public LoginAuthenticationFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String method  = request.getMethod();
        if (!"POST".equals(method)) {
            throw new RuntimeException();
        }

        ServletInputStream inputStream = request.getInputStream();
        LoginRequestDto loginRequestDto = objectMapper.readValue(inputStream, LoginRequestDto.class);

        return this.getAuthenticationManager()
                .authenticate(new UsernamePasswordAuthenticationToken(
                                loginRequestDto.username, loginRequestDto.password)
                );
    }

    public class LoginRequestDto {
        public String username;
        public String password;
    }
}
