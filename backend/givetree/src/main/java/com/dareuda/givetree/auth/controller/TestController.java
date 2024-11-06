package com.dareuda.givetree.auth.controller;

import com.dareuda.givetree.auth.domain.MemberPrinciple;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok().body("ok");
    }

    @GetMapping("/argument-test")
    public ResponseEntity<OAuth2User> argumentTest(@AuthenticationPrincipal MemberPrinciple memberPrinciple) {
        long id = memberPrinciple.getId();
        return ResponseEntity.ok().body(memberPrinciple);
    }
}
