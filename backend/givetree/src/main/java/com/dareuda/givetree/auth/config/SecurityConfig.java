package com.dareuda.givetree.auth.config;

import com.dareuda.givetree.auth.domain.OAuthUserService;
import com.dareuda.givetree.auth.filter.JsonUsernamePasswordAuthenticationFilter;
import com.dareuda.givetree.auth.handler.CustomAuthenticationEntryPoint;
import com.dareuda.givetree.auth.handler.CustomLoginFailureHandler;
import com.dareuda.givetree.auth.handler.CustomLoginSuccessHandler;
import com.dareuda.givetree.auth.handler.CustomLogoutSuccessHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OAuthUserService OAuthUserService;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;
    private final CustomLoginFailureHandler customLoginFailureHandler;
    private final ObjectMapper objectMapper;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager =
                authenticationManager(http.getSharedObject(AuthenticationConfiguration.class));
        JsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordAuthenticationFilter =
                jsonUsernamePasswordAuthenticationFilter(authenticationManager);

        http
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable);

        http
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(OAuthUserService))
                        .authorizationEndpoint(authorization -> authorization
                                .baseUri("/api/oauth2/authorization/**"))
                        .redirectionEndpoint(redirection -> redirection
                                .baseUri("/api/login/oauth2/**"))
                        .successHandler(customLoginSuccessHandler)
                        .failureHandler(customLoginFailureHandler));

        http
                .addFilterAt(jsonUsernamePasswordAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        http
                .logout(logout -> logout.logoutUrl("/api/logout")
                        .logoutSuccessHandler(customLogoutSuccessHandler)
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"));

        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/oauth2/**", "/api/login/**", "api/signup").permitAll()
                        .anyRequest().permitAll());

        http.
                exceptionHandling(exception -> exception
                        .authenticationEntryPoint(customAuthenticationEntryPoint));

        return http.build();
    }

    @Bean
    public JsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager) {
        JsonUsernamePasswordAuthenticationFilter filter =
                new JsonUsernamePasswordAuthenticationFilter(objectMapper, customLoginSuccessHandler, customLoginFailureHandler);
        filter.setAuthenticationManager(authenticationManager);

        filter.setSecurityContextRepository(new HttpSessionSecurityContextRepository());
        return filter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
