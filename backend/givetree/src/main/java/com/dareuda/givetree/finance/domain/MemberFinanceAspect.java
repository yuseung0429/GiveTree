package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.finance.controller.MemberFinanceErrorCode;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class MemberFinanceAspect {

    private final MemberFinanceReader memberFinanceReader;

    @Before("@annotation(RequiredMemberFinance)")
    public void validateMemberFinanceExists(JoinPoint joinPoint) {
        // TODO. MemberFinance 검증 수정 필요
        // Session으로 바뀔 경우, ContextHolder에서 memberId 가져온 후 검증
        // 또는 AOP가 아닌 Interceptor에서 검증하도록 변경 예정

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();

        String[] parameterNames = signature.getParameterNames();
        Object[] args = joinPoint.getArgs();

        Long memberId = null;
        for (int i = 0; i < parameterNames.length; i++) {
            if ("memberId".equals(parameterNames[i]) && args[i] instanceof Long) {
                memberId = (Long) args[i];
                break;
            }
        }

        if (memberId == null || !memberFinanceReader.isExists(memberId)) {
            throw new RestApiException(MemberFinanceErrorCode.MEMBER_FINANCE_NOT_FOUND);
        }
    }
}