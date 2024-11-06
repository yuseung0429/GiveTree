package com.dareuda.givetree.auth.domain;

import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class JsonUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow();

        return UserPrinciple.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .role(member.getRole())
                .build();
    }
}
