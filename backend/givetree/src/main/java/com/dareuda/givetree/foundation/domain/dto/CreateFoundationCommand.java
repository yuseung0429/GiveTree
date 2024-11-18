package com.dareuda.givetree.foundation.domain.dto;

import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import lombok.*;

import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateFoundationCommand {
    @NonNull
    private final CreateMemberCommand createMemberCommand;

    @NonNull
    private final String introduction;

    @NonNull
    private final String corporateRegistrationNumber;

    @NonNull
    private final String phoneNumber;

    @NonNull
    private final String address;

    private final String titleImageUrl;

    @NonNull
    private final List<String> imageUrls;

    @NonNull
    private final List<String> categories;
}
