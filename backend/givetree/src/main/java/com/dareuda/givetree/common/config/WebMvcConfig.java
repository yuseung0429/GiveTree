package com.dareuda.givetree.common.config;

import com.dareuda.givetree.common.file_validator.FileValidator;
import com.dareuda.givetree.common.interceptor.MediaExtensionValidationInterceptor;
import com.dareuda.givetree.common.resolver.MediaExtensionValidationArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

//    private final MediaExtensionValidationInterceptor mediaExtensionValidationInterceptor;
    private final MediaExtensionValidationArgumentResolver mediaExtensionValidationArgumentResolver;

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(mediaExtensionValidationInterceptor)
//                .addPathPatterns("/media/**");
//    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(mediaExtensionValidationArgumentResolver);
    }
}
