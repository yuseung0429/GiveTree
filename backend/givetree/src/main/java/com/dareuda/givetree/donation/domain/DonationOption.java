package com.dareuda.givetree.donation.domain;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum DonationOption {
    ONE_TIME_DONATION("one-time"),
    REGULAR_DONATION("regular"),
    ;

    private final String token;

    public static DonationOption fromToken(String token) {
        for (final DonationOption donationOption : DonationOption.values()) {
            if (donationOption.token.equals(token)) {
                return donationOption;
            }
        }

        throw new IllegalArgumentException("Cannot find DonationOption for token: " + token);
    }
}
