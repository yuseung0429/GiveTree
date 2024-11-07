package com.dareuda.givetree.member.domain.dto;

import com.dareuda.givetree.member.domain.Role;
import lombok.*;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateMemberCommand {
    @NonNull
    private final String email;

    private final String password;

    @NonNull
    private final String name;

    private final String profileImageUrl;

    private final Role role;
}
