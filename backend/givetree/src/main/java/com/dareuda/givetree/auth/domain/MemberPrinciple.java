package com.dareuda.givetree.auth.domain;

import com.dareuda.givetree.member.domain.Role;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class MemberPrinciple implements UserDetails, OAuth2User, Serializable {

    private long id;

    private String name;

    private String email;

    private Role role;

    private Map<String, Object> attributes;

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
}
