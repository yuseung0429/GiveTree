package com.dareuda.givetree.member.domain.dto;

import com.dareuda.givetree.member.domain.Role;
import lombok.*;

@Getter
@Builder
@RequiredArgsConstructor
public class CreateMemberCommand {
    @NonNull
    private final String email;

    @NonNull
    private final String password;

    @NonNull
    private final String name;

    private final String profileImageUrl;

    private final Role role;
}
