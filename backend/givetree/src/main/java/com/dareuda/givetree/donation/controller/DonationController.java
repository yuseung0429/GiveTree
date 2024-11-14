package com.dareuda.givetree.donation.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.donation.controller.dto.CampaignDonateRequest;
import com.dareuda.givetree.donation.controller.dto.FoundationDonateRequest;
import com.dareuda.givetree.donation.controller.dto.FoundationRegularDonateRequest;
import com.dareuda.givetree.donation.domain.FoundationDonateSubscriptionInfo;
import com.dareuda.givetree.donation.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {
    private final DonationService donationService;

    @GetMapping("/foundations/regular")
    public ResponseEntity<?> readFoundationDonationRegular(
            @AuthenticationPrincipal UserPrinciple user,
            Pageable pageable
    ) {
        Slice<FoundationDonateSubscriptionInfo> infos
                = donationService.readFoundationDonationRegular(user.getId(), pageable);
        return ResponseEntity.ok().body(infos);
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

    @PostMapping("/campaigns/{campaignId}")
    public ResponseEntity<?> donateToCampaign(
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
}
