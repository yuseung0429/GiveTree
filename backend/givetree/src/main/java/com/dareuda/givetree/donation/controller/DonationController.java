package com.dareuda.givetree.donation.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.donation.domain.*;
import com.dareuda.givetree.donation.controller.dto.request.CampaignDonateRequest;
import com.dareuda.givetree.donation.controller.dto.request.FoundationDonateRequest;
import com.dareuda.givetree.donation.controller.dto.request.FoundationRegularDonateRequest;
import com.dareuda.givetree.donation.controller.dto.response.ReadDonationTreeResponse;
import com.dareuda.givetree.donation.controller.dto.response.ReadFirstDonationTreeResponse;
import com.dareuda.givetree.donation.domain.DonationTree;
import com.dareuda.givetree.donation.domain.FoundationDonateSubscriptionInfo;
import com.dareuda.givetree.donation.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {
    private final DonationService donationService;

    @GetMapping("/foundations")
    public ResponseEntity<?> readFoundationDonationFoundationInfo(
            @AuthenticationPrincipal UserPrinciple user,
            Pageable pageable
    ) {
        Slice<FoundationDonationFoundationInfo> infos = donationService.readFoundationDonationFoundationInfo(
                user.getId(),
                pageable
        );
        return ResponseEntity.ok().body(infos);
    }

    @GetMapping("/foundations/{foundationId}")
    public ResponseEntity<?> readFoundationDonationUserInfo(
            @AuthenticationPrincipal UserPrinciple user,
            @PathVariable long foundationId,
            @RequestParam(defaultValue = "false") boolean own,
            @RequestParam(name = "start-date", required = false) LocalDate startDate,
            @RequestParam(name = "end-date", required = false) LocalDate endDate,
            Pageable pageable
    ) {
        Slice<FoundationDonationUserInfo> info = donationService.readFoundationDonationUserInfo(
                user.getId(),
                foundationId,
                own,
                startDate,
                endDate,
                pageable
        );
        return ResponseEntity.ok().body(info);
    }

    @PostMapping("/foundations/{foundationId}")
    public ResponseEntity<?> donateFoundation(
            @AuthenticationPrincipal UserPrinciple user,
            @PathVariable long foundationId,
            @RequestBody FoundationDonateRequest request
    ) {
        donationService.donateFoundation(
                user.getId(),
                foundationId,
                request.getAmount(),
                request.getSimplePassword()
        );
        return ResponseEntity.ok().build();
    }

    @GetMapping("/foundations/{foundationId}/amount")
    public ResponseEntity<?> readFoundationDonationAmount(
            @AuthenticationPrincipal UserPrinciple user,
            @PathVariable Long foundationId,
            @RequestParam(defaultValue = "false") Boolean own
    ) {
        long amount = donationService.readFoundationDonationAmount(user.getId(), foundationId, own);
        return ResponseEntity.ok().body(Map.of("amount", amount));
    }

    @GetMapping("/foundations/{foundationId}/statistic")
    public ResponseEntity<?> readFoundationDonationStatistic(
            @PathVariable long foundationId,
            @RequestParam(name = "start-date", required = false) LocalDate startDate,
            @RequestParam(name = "end-date", required = false) LocalDate endDate
    ) {
        FoundationDonationStatisticInfo info = donationService.readFoundationDonationStatisticInfo(
                foundationId,
                startDate,
                endDate
        );
        return ResponseEntity.ok().body(info);
    }

    @GetMapping("/foundations/regular")
    public ResponseEntity<?> readFoundationDonationRegular(
            @AuthenticationPrincipal UserPrinciple user,
            Pageable pageable
    ) {
        Slice<FoundationDonateSubscriptionInfo> infos = donationService.readFoundationDonationRegular(
                user.getId(),
                pageable
        );
        return ResponseEntity.ok().body(infos);
    }

    @PostMapping("/foundations/{foundationId}/regular")
    public ResponseEntity<?> donateFoundationRegular(
            @AuthenticationPrincipal UserPrinciple user,
            @PathVariable long foundationId,
            @RequestBody FoundationRegularDonateRequest request
    ) {
        donationService.registerFoundationDonateSubscription(
                user.getId(),
                foundationId,
                request.getAmount(),
                request.getSimplePassword()
        );
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/foundations/{foundationId}/regular")
    public ResponseEntity<?> donateFoundationRegular(
            @AuthenticationPrincipal UserPrinciple user,
            @PathVariable long foundationId
    ) {
        donationService.removeFoundationDonateSubscription(
                user.getId(),
                foundationId
        );
        return ResponseEntity.ok().build();
    }

    @GetMapping("/campaigns")
    public ResponseEntity<?> readCampaignDonationFoundationInfo(
            @AuthenticationPrincipal UserPrinciple user,
            Pageable pageable
    ) {
        Slice<CampaignDonationFoundationInfo> infos = donationService.readCampaignDonationFoundationInfo(
                user.getId(),
                pageable
        );
        return ResponseEntity.ok().body(infos);
    }

    @GetMapping("/campaigns/{campaignId}")
    public ResponseEntity<?> readCampaignDonationUserInfo(
            @AuthenticationPrincipal UserPrinciple user,
            @PathVariable Long campaignId,
            @RequestParam(defaultValue = "false") boolean own,
            Pageable pageable
    ) {
        Slice<CampaignDonationUserInfo> infos = donationService.readCampaignDonationUserInfo(
                user.getId(),
                campaignId,
                own,
                pageable
        );
        return ResponseEntity.ok().body(infos);
    }

    @PostMapping("/campaigns/{campaignId}")
    public ResponseEntity<?> donateCampaign(
            @AuthenticationPrincipal UserPrinciple user,
            @PathVariable long campaignId,
            @RequestBody CampaignDonateRequest request
    ) {
        donationService.donateCampaign(
                user.getId(),
                campaignId,
                request.getAmount(),
                request.getMessage(),
                request.getSimplePassword()
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/campaigns/tree")
    public ResponseEntity<ReadFirstDonationTreeResponse> readFirstDonationTree(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @RequestParam(required = false) Long currentCampaignId
    ) {
        DonationTree result = donationService.readFirstDonationTree(userPrinciple.getId(), currentCampaignId);
        return ResponseEntity.ok().body(ReadFirstDonationTreeResponse.from(result));
    }

    @GetMapping("/campaigns/{campaignId}/tree")
    public ResponseEntity<ReadDonationTreeResponse> readDonationTree(
            @PathVariable long campaignId,
            @PageableDefault Pageable pageable
    ) {
        DonationTree result =  donationService.readDonationTree(campaignId, pageable);
        return ResponseEntity.ok().body(ReadDonationTreeResponse.from(result));
    }

    @GetMapping("/campaigns/{campaignId}/statistic")
    public ResponseEntity<?> readCampaignDonationStatistic(@PathVariable long campaignId) {
        CampaignDonationStatisticInfo info = donationService.readCampaignDonationStatisticInfo(campaignId);
        return ResponseEntity.ok().body(info);
    }

    @GetMapping("/amount")
    public ResponseEntity<?> readAmount(
            @AuthenticationPrincipal UserPrinciple user,
            @RequestParam(name = "start-date", required = false) LocalDate startDate,
            @RequestParam(name = "end-date", required = false) LocalDate endDate
    ) {
        long amount = donationService.readAmount(user.getId(), startDate, endDate);
        return ResponseEntity.ok().body(Map.of("amount", amount));
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> readStatistic(@AuthenticationPrincipal UserPrinciple user) {
        DonationStatisticInfo info = donationService.readStatistic(user.getId());
        return ResponseEntity.ok().body(info);
    }
}
