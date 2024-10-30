package com.dareuda.givetree.common.config;

import com.dareuda.givetree.common.interceptor.MediaExtensionValidationInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final MediaExtensionValidationInterceptor mediaExtensionValidationInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(mediaExtensionValidationInterceptor)
                .addPathPatterns("/media/**");
    }
}
