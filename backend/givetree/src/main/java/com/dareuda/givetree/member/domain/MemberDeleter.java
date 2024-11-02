package com.dareuda.givetree.member.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class MemberDeleter {
    private final MemberReader memberReader;

    @Transactional
    public void delete(long memberId) {
        Member member = memberReader.read(memberId);
        member.delete();
    }
}
