package com.dareuda.givetree.donation.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.donation.controller.dto.request.CampaignDonateRequest;
import com.dareuda.givetree.donation.controller.dto.request.FoundationDonateRequest;
import com.dareuda.givetree.donation.controller.dto.request.FoundationRegularDonateRequest;
import com.dareuda.givetree.donation.controller.dto.response.ReadDonationTreeResponse;
import com.dareuda.givetree.donation.controller.dto.response.ReadFirstDonationTreeResponse;
import com.dareuda.givetree.donation.domain.DonationTree;
import com.dareuda.givetree.donation.domain.CampaignDonationInfo;
import com.dareuda.givetree.donation.domain.FoundationDonateSubscriptionInfo;
import com.dareuda.givetree.donation.domain.FoundationDonationInfo;
import com.dareuda.givetree.donation.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {
    private final DonationService donationService;

    @GetMapping("/foundations")
    public ResponseEntity<?> readFoundationDonation(
            @AuthenticationPrincipal UserPrinciple user,
            Pageable pageable
    ) {
        Slice<FoundationDonationInfo> infos = donationService.readFoundationDonation(user.getId(), pageable);
        return ResponseEntity.ok().body(infos);
    }


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

    @GetMapping("/campaigns")
    public ResponseEntity<?> readCampaignDonation(
            @AuthenticationPrincipal UserPrinciple user,
            Pageable pageable
    ) {
        Slice<CampaignDonationInfo> infos = donationService.readCampaignDonation(user.getId(), pageable);
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
}
