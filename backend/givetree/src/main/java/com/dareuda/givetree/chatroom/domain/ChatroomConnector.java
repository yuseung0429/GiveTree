package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.chatroom.infrastructure.ChatroomConnectionRepository;
import com.dareuda.givetree.chatroom.infrastructure.ChatroomRepository;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import com.dareuda.givetree.sale.domain.Sale;
import com.dareuda.givetree.sale.domain.SaleReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ChatroomConnector {
    private final ChatroomRepository chatroomRepository;
    private final SaleReader saleReader;
    private final ChatroomConnectionRepository chatroomConnectionRepository;
    private final MemberReader memberReader;

    @Transactional
    public long connect(long memberId, long saleId) {
        Member purchaser = memberReader.read(memberId);
        Sale sale = saleReader.read(saleId);

        ChatroomConnection chatroomConnection = chatroomConnectionRepository.findByMemberIdAndChatroomSaleId(memberId, saleId)
                .orElseGet(() -> {
                    Chatroom chatroom = chatroomRepository.save(new Chatroom(sale));
                    Member seller = memberReader.readReference(sale.getSellerId());
                    chatroomConnectionRepository.save(new ChatroomConnection(chatroom, seller));
                    return chatroomConnectionRepository.save(new ChatroomConnection(chatroom, purchaser));
                });

        return chatroomConnection.getChatroom().getId();
    }
}
