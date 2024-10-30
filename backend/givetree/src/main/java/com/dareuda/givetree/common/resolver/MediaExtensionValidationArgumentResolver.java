package com.dareuda.givetree.common.resolver;

import com.dareuda.givetree.common.file_validator.FileValidator;
import com.dareuda.givetree.media.controller.ValidExtension;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Component
public class MediaExtensionValidationArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String FILE_NAME = "file";

    private final List<FileValidator> fileValidators;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(ValidExtension.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory
    ) throws Exception {
        MultipartHttpServletRequest multipartHttpServletRequest = getMultipartHttpServletRequest(webRequest);

        MultipartFile multipartFile = multipartHttpServletRequest.getFile(FILE_NAME);
        validateIsRightFile(multipartFile);

        return multipartFile;
    }

    private void validateIsRightFile(MultipartFile multipartFile) {
        fileValidators.forEach(fileValidator -> fileValidator.validate(multipartFile));
    }

    private MultipartHttpServletRequest getMultipartHttpServletRequest(NativeWebRequest webRequest) {
        HttpServletRequest httpServletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        Objects.requireNonNull(httpServletRequest);

        return (MultipartHttpServletRequest) httpServletRequest;
    }
}
