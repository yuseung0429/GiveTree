package com.dareuda.givetree.member.domain.dto;

import lombok.*;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateMemberCommand {
    @NonNull
    private final String email;

    @NonNull
    private final String password;

    @NonNull
    private final String name;

    private final String profileImageUrl;
}
