package com.dareuda.givetree.member.infrastructure;

import com.dareuda.givetree.member.domain.Member;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface MemberRepository extends Repository<Member, Long> {
    Member save(Member member);
    Optional<Member> findById(long id);
}
