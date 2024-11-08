package com.dareuda.givetree.member.domain.policy;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class MemberRoleManager {
    @Before("execution(public long com.dareuda.givetree.member.service.MemberService.createMember(*))")
    public void filterCreateNonFoundationMember(final JoinPoint joinPoint) {
        CreateMemberCommand command = (CreateMemberCommand) joinPoint.getArgs()[0];

        if (command.getRole().equals(Role.USER)) {
            throw new RestApiException(CommonErrorCode.BAD_REQUEST, "정책상 해당 요청을 통해 일반 회원으로 가입이 불가능합니다.");
        }
        if (command.getRole().equals(Role.ADMIN)) {
            throw new RestApiException(CommonErrorCode.BAD_REQUEST, "정책상 해당 요청을 통해 운영자 회원으로 가입이 불가능합니다.");
        }
    }
}
