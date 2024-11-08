package com.dareuda.givetree.member.service;

import com.dareuda.givetree.member.domain.*;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.dareuda.givetree.member.domain.dto.MemberDetail;
import com.dareuda.givetree.member.domain.dto.UpdateMemberCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberCreator memberCreator;
    private final MemberUpdater memberUpdater;
    private final MemberDeleter memberDeleter;
    private final MemberDetailReader memberDetailReader;

    public long createMember(CreateMemberCommand command) {
        return memberCreator.create(command).getId();
    }

    public void updateMember(long memberId, UpdateMemberCommand command) {
        memberUpdater.update(memberId, command);
    }

    public void deleteMember(long memberId) {
        memberDeleter.delete(memberId);
    }

    public MemberDetail getMemberDetail(long memberId) {
        return memberDetailReader.read(memberId);
    }
}
