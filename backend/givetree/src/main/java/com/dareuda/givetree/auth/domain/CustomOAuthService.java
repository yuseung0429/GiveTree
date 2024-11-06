package com.dareuda.givetree.auth.domain;

import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberCreator;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class CustomOAuthService extends DefaultOAuth2UserService {

    private final MemberCreator memberCreator;
    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId();

        Map<String, Object> attributes = oauth2User.getAttributes();
        UserProfile userProfile = OAuthAttributes.extract(registrationId, attributes);

        Member member = createMemberIfNotExists(userProfile);

        return MemberPrinciple.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .role(Role.USER)
                .attributes(attributes)
                .build();
    }

    private Member createMemberIfNotExists(UserProfile userProfile) {
        return memberRepository.findByEmail(userProfile.getEmail())
                .orElseGet(() -> memberCreator.create(userProfile.toCreateMemberCommand()));
    }
}
