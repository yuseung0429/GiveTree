package com.dareuda.givetree.common.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class AdminConfig {

    @Value("${app.admin.member-id}")
    private Long memberId;

    @Value("${app.admin.wallet-id}")
    private Long walletId;

    @Value("${app.admin.email}")
    private String email;

    @Value("${app.admin.password}")
    private String password;

    @Value("${app.admin.simple-password}")
    private String simplePassword;
}
