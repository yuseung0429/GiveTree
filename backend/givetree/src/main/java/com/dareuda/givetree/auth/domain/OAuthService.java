package com.dareuda.givetree.auth.domain;

import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberCreator;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OAuthService extends DefaultOAuth2UserService {

    private final MemberCreator memberCreator;
    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        Map<String, Object> attributes = oauth2User.getAttributes();
        UserProfile userProfile = OAuthAttributes.extract(registrationId, attributes);

        createMemberIfNotExists(userProfile);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(Role.USER.getKey())),
                attributes,
                userNameAttributeName
        );
    }

    private void createMemberIfNotExists(UserProfile userProfile) {
        Optional<Member> existingMember = memberRepository.findByEmail(userProfile.getEmail());
        if (existingMember.isEmpty()) {
            memberCreator.create(userProfile.toCreateMemberCommand());
        }
    }
}
