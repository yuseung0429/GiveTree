package com.dareuda.givetree.auth.domain;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

@RequiredArgsConstructor
public enum OAuthAttributes {

    GOOGLE("google", attributes -> {
        return new UserProfile(
                String.valueOf(attributes.get("sub")),
                (String) attributes.get("name"),
                (String) attributes.get("email")
        );
    }),
    KAKAO("kakao", attributes -> {
        Map<String, Object> kakaoAccountAttributes = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profileAttribute = (Map<String, Object>) kakaoAccountAttributes.get("profile");
        return new UserProfile(
                attributes.get("id").toString(),
                (String) profileAttribute.get("nickname"),
                (String) kakaoAccountAttributes.get("email")
        );
    }),
    NAVER("naver", attributes -> {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return new UserProfile(
                (String) response.get("id"),
                (String) response.get("name"),
                (String) response.get("email")
        );
    })
    ;

    private final String registrationId;
    private final Function<Map<String, Object>, UserProfile> of;

    public static UserProfile extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }
}
