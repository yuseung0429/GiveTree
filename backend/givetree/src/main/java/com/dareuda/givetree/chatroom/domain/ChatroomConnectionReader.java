package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.chatroom.infrastructure.ChatroomConnectionRepository;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.member.domain.MemberDetailReader;
import com.dareuda.givetree.member.domain.dto.MemberDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatroomConnectionReader {
    private final ChatroomConnectionRepository chatroomConnectionRepository;
    private final MemberDetailReader memberDetailReader;

    @Transactional(readOnly = true)
    public ChatroomConnection readByMemberAndSale(long memberId, long saleId) {
        return chatroomConnectionRepository.findByMemberIdAndChatroomSaleId(memberId, saleId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "회원과 채팅방의 연결을 찾을 수 없습니다."));
    }

    @Transactional(readOnly = true)
    public List<ChatroomConnection> readByMember(long memberId) {
        return chatroomConnectionRepository.findByMemberId(memberId);
    }

    @Transactional(readOnly = true)
    public ChatroomConnection readCounterpartConnection(long memberId, long chatroomId) {
        return chatroomConnectionRepository.findFirstByMemberIdNotAndChatroomId(memberId, chatroomId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "상대 회원과 채팅방의 연결을 찾을 수 없습니다."));
    }

    @Transactional(readOnly = true)
    public MemberDetail readCounterpartMemberDetail(long memberId, long chatroomId) {
        ChatroomConnection connection = readCounterpartConnection(memberId, chatroomId);

        return memberDetailReader.read(connection.getMember().getId());
    }
}
