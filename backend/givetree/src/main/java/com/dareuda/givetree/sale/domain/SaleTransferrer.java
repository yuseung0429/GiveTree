package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.donation.domain.FoundationDonationType;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.member.domain.MemberValidator;
import com.dareuda.givetree.token.domain.FoundationDonationTokenTransferrer;
import com.dareuda.givetree.token.domain.TokenCharger;
import com.dareuda.givetree.token.domain.TokenExchanger;
import com.dareuda.givetree.token.domain.UserTokenTransferrer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SaleTransferrer {

    private final MemberValidator memberValidator;
    private final MemberFinanceValidator memberFinanceValidator;
    private final TokenCharger tokenCharger;
    private final UserTokenTransferrer userTokenTransferrer;
    private final TokenExchanger tokenExchanger;
    private final FoundationDonationTokenTransferrer foundationDonationTokenTransferrer;

    public void transfer(long senderId, long receiverId, long foundationId, long amount, long donationAmount, String simplePassword, String message) {
        if(amount < donationAmount) {
            throw new IllegalArgumentException("amount > donationAmount");
        }

        memberValidator.validateUser(senderId);
        memberValidator.validateUser(receiverId);
        memberValidator.validateFoundation(foundationId);

        memberFinanceValidator.validateSimplePassword(senderId, simplePassword);

        tokenCharger.charge(senderId, amount, message);

        userTokenTransferrer.transfer(senderId, receiverId, amount);
        foundationDonationTokenTransferrer.transfer(receiverId, foundationId, donationAmount, FoundationDonationType.ONE_TIME);
        tokenExchanger.exchange(receiverId, amount - donationAmount, message);
    }
}
