package com.dareuda.givetree.auth.config;

import com.dareuda.givetree.auth.domain.JsonUserDetailsService;
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
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    private final OAuthUserService OAuthUserService;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;
    private final CustomLoginFailureHandler customLoginFailureHandler;
    private final ObjectMapper objectMapper;
    private final JsonUserDetailsService jsonUserDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

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
                .addFilterAt(jsonUsernamePasswordAuthenticationFilter(http),
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
    public JsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordAuthenticationFilter(HttpSecurity http) {
        JsonUsernamePasswordAuthenticationFilter filter =
                new JsonUsernamePasswordAuthenticationFilter(objectMapper, customLoginSuccessHandler, customLoginFailureHandler);
        filter.setAuthenticationManager(authenticationManager());
        filter.setAuthenticationSuccessHandler(customLoginSuccessHandler);
        filter.setAuthenticationFailureHandler(customLoginFailureHandler);
        filter.setSessionAuthenticationStrategy(http.getSharedObject(SessionAuthenticationStrategy.class));
        return filter;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(jsonUserDetailsService);

        return new ProviderManager(provider);
    }
}
