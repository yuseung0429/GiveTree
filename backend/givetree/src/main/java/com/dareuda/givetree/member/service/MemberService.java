package com.dareuda.givetree.member.service;

import com.dareuda.givetree.member.controller.dto.request.CreateMemberRequest;
import com.dareuda.givetree.member.domain.MemberCreator;
import com.dareuda.givetree.member.domain.MemberDetail;
import com.dareuda.givetree.member.domain.MemberDetailReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberCreator memberCreator;
    private final MemberDetailReader memberDetailReader;

    public long createMember(CreateMemberRequest request) {
        return memberCreator.append(request);
    }

    public MemberDetail getMemberDetail(long memberId) {
        return memberDetailReader.read(memberId);
    }
}
