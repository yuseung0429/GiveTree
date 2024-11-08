package com.dareuda.givetree.member.domain.policy;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.foundation.controller.FoundationErrorCode;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayDeque;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Queue;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class UnregisteredFoundationMemberManager {
    private final Map<Long, Long> unregisteredFoundationMemberExpireTimeMap = new LinkedHashMap<>();
    private final MemberRepository memberRepository;

    private static final long VALID_DURATION = 600000L;
    private static final long SCHEDULE_CYCLE = 100000L;

    @AfterReturning(
            pointcut = "execution(public long com.dareuda.givetree.member.service.MemberService.createMember(*))",
            returning = "memberId"
    )
    public void afterCreateFoundationMember(JoinPoint joinPoint, long memberId) {
        CreateMemberCommand command = (CreateMemberCommand) joinPoint.getArgs()[0];

        if (!command.getRole().equals(Role.FOUNDATION)) {
            return;
        }
        unregisteredFoundationMemberExpireTimeMap.put(memberId, System.currentTimeMillis() + VALID_DURATION);
    }

    @Around("execution(public long com.dareuda.givetree.foundation.service.FoundationService.createFoundation(*, *))")
    public Object aroundCreateFoundation(ProceedingJoinPoint joinPoint) throws Throwable {
        long memberId = (long) joinPoint.getArgs()[0];

        if (!unregisteredFoundationMemberExpireTimeMap.containsKey(memberId)) {
            throw new RestApiException(FoundationErrorCode.FOUNDATION_MEMBER_NOT_FOUND);
        }

        long expireTime = unregisteredFoundationMemberExpireTimeMap.get(memberId);
        if (expireTime < System.currentTimeMillis()) {
            unregisteredFoundationMemberExpireTimeMap.remove(memberId);
            throw new RestApiException(FoundationErrorCode.FOUNDATION_MEMBER_NOT_FOUND);
        }

        Object result = joinPoint.proceed();

        unregisteredFoundationMemberExpireTimeMap.remove(memberId);

        return result;
    }

    @Scheduled(fixedDelay = SCHEDULE_CYCLE)
    public void cleanExpiredMembers() {
        log.debug("Started to clean unregistered member.");

        Queue<Long> cleanQueue = new ArrayDeque<>();
        for (Map.Entry<Long, Long> entry : unregisteredFoundationMemberExpireTimeMap.entrySet()) {
            long memberId = entry.getKey();
            long expireTime = entry.getValue();

            if (expireTime > System.currentTimeMillis()) {
                break;
            }

            cleanQueue.add(memberId);
        }
        for (Long memberId : cleanQueue) {
            unregisteredFoundationMemberExpireTimeMap.remove(memberId);
            memberRepository.deleteById(memberId);
            log.debug("Member {} expired", memberId);
        }
    }
}
