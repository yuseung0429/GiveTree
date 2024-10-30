package com.dareuda.givetree.common.interceptor;

import com.dareuda.givetree.common.file_validator.FileValidator;
import com.dareuda.givetree.media.controller.ValidExtension;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

@RequiredArgsConstructor
@Component
public class MediaExtensionValidationInterceptor implements HandlerInterceptor {

    private static final String FILE_NAME = "file";

    private final List<FileValidator> fileValidators;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        if (handlerMethod.getMethodAnnotation(ValidExtension.class) == null) {
            return true;
        }

        if (!(request instanceof MultipartHttpServletRequest multipartRequest)) {
            throw new RuntimeException();
        }

        MultipartFile multipartFile = multipartRequest.getFile(FILE_NAME);
        if (multipartFile == null) {
            throw new RuntimeException();
        }
        validateIsRightFile(multipartFile);

        return true;
    }

    private void validateIsRightFile(MultipartFile multipartFile) {
        fileValidators.forEach(fileValidator -> fileValidator.validate(multipartFile));
    }
}
