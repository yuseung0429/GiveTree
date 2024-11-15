package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.chatroom.infrastructure.ChatroomConnectionRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@RequiredArgsConstructor
public class ChatroomReservationNotifier {
    private final ChatroomAdminMessageSender chatroomAdminMessageSender;
    private final ChatroomConnectionRepository chatroomConnectionRepository;

    @AfterReturning("execution(public void com.dareuda.givetree.sale.service.SaleService.reserveSale(*))")
    public void notifyReservationToChatroom(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String[] parameterNames = signature.getParameterNames();

        int purchaserIdIndex = Arrays.asList(parameterNames).indexOf("purchaserId");
        long purchaserId = (long) joinPoint.getArgs()[purchaserIdIndex];

        int saleIdIndex = Arrays.asList(parameterNames).indexOf("saleId");
        long saleId = (long) joinPoint.getArgs()[saleIdIndex];

        ChatroomConnection connection = chatroomConnectionRepository.findByMemberIdAndChatroomSaleId(purchaserId, saleId)
                .orElse(null);

        if (connection == null) {
            return;
        }

        chatroomAdminMessageSender.send(
                connection.getChatroom().getId(),
                "예약 알림 메세지!"
        );
    }
}
