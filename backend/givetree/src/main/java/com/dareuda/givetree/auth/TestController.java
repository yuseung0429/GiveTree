package com.dareuda.givetree.auth;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberCreator;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TestController {

    private final MemberCreator memberCreator;

    @PostMapping("/api/signup")
    public ResponseEntity<Member> signup() {
        Member member = memberCreator.create(CreateMemberCommand.builder()
                        .email("test@gmail.com")
                        .password("123")
                        .name("Test")
                        .role(Role.USER)
                        .build());
        return ResponseEntity.ok().body(member);
    }

    @GetMapping("/test")
    public ResponseEntity<UserPrinciple> test(@AuthenticationPrincipal UserPrinciple user) {
        return ResponseEntity.ok().body(user);
    }
}
