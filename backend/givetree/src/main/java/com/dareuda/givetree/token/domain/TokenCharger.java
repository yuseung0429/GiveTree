package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.account.domain.PayProcessor;
import com.dareuda.givetree.account.domain.RefundFailureAppender;
import com.dareuda.givetree.account.domain.RefundProcessor;
import com.dareuda.givetree.wallet.domain.MemberWalletReader;
import com.dareuda.givetree.wallet.domain.Wallet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenCharger {

    private final PayProcessor payProcessor;
    private final RefundProcessor refundProcessor;
    private final TokenGenerator tokenGenerator;
    private final MemberWalletReader memberWalletReader;
    private final RefundFailureAppender refundFailureAppender;

    public void charge(long memberId, long amount, String simplePassword) {
        long ledgerId = payProcessor.process(memberId, amount, simplePassword);
        try {
            Wallet wallet = memberWalletReader.readByMemberId(memberId);
            tokenGenerator.generate(wallet.getId(), amount, ledgerId);
        } catch (Exception e1) {
            try {
                refundProcessor.process(memberId, amount);
            } catch (Exception e2) {
                refundFailureAppender.append(ledgerId, amount);
            }
        }
    }
}
