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
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final OAuthUserService OAuthUserService;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final JsonUserDetailsService jsonUserDetailsService;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;
    private final CustomLoginFailureHandler customLoginFailureHandler;
    private final ObjectMapper objectMapper;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable);

        http
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(OAuthUserService)));

        http
                .addFilterAt(jsonUsernamePasswordAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class);

        http
                .logout(logout -> logout.logoutUrl("/api/logout")
                        .logoutSuccessHandler(customLogoutSuccessHandler)
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"));

        http
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/oauth2/**", "/api/login").permitAll()
                    .anyRequest().authenticated());

        http.
                exceptionHandling(exception -> exception
                        .authenticationEntryPoint(customAuthenticationEntryPoint));

        return http.build();
    }

    @Bean
    public JsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordAuthenticationFilter( ) {
        JsonUsernamePasswordAuthenticationFilter filter =
                new JsonUsernamePasswordAuthenticationFilter(objectMapper, customLoginSuccessHandler, customLoginFailureHandler);
        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(jsonUserDetailsService);

        return new ProviderManager(provider);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
