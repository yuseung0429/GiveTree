package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.campaign.domain.CampaignReader;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import com.dareuda.givetree.notification.domain.FcmMessageSender;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Async
@Component
public class SaleNotificationSender {

    private final MemberReader memberReader;
    private final SaleReader saleReader;
    private final CampaignReader campaignReader;
    private final FcmMessageSender fcmMessageSender;

    public void sendRemoveSaleNotification(long saleId) {
        Sale removedSale = saleReader.readRemovedSale(saleId);
        if (!removedSale.isReserved()) {
            return;
        }
        Member purchaser = memberReader.read(removedSale.getPurchaserId());

        String title = String.format("%s님, 관심 상품이 예약 취소되었습니다.", purchaser.getName());
        String body = String.format("\"%s\"이 판매 종료되어 예약이 취소되었습니다.", removedSale.getTitle());

        fcmMessageSender.send(purchaser.getId(), title, body);
    }

    public void sendReservationNotification(long purchaserId, long saleId) {
        Member purchaser = memberReader.read(purchaserId);
        Sale sale = saleReader.read(saleId);

        String title = String.format("%s님, 관심 상품이 예약 되었습니다!", purchaser.getName());
        String body = String.format("관심보이신 \"%s\"이 예약 되었습니다!", sale.getTitle());

        fcmMessageSender.send(purchaser.getId(), title, body);
    }

    public void sendReservationCancelNotification(long purchaserId, long saleId) {
        Member purchaser = memberReader.read(purchaserId);
        Sale sale = saleReader.read(saleId);

        String title = String.format("%s님, 관심 상품이 예약 취소되었습니다.", purchaser.getName());
        String body = String.format("\"%s\"의 예약이 취소되었습니다.", sale.getTitle());

        fcmMessageSender.send(purchaser.getId(), title, body);
    }

    public void sendPaymentNotification(long saleId) {
        Sale sale = saleReader.read(saleId);
        Member seller = memberReader.read(sale.getSellerId());

        String title = String.format("%s님, 상품이 거래 완료되었습니다!", seller.getName());
        String body = String.format(
                "\"%s\"이 판매되어 %,d원이 \"%s\" 캠페인에 기부되었습니다! 감사합니다!",
                sale.getTitle(),
                sale.getContribution(),
                campaignReader.read(sale.getFundedFoundationId()).getName()
        );

        fcmMessageSender.send(seller.getId(), title, body);
    }
}
