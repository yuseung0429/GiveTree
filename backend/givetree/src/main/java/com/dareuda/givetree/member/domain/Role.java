package com.dareuda.givetree.member.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    USER("ROLE_USER"),
    FOUNDATION("ROLE_FOUNDATION"),
    ADMIN("ROLE_ADMIN"),
    ;

    private final String key;
}
