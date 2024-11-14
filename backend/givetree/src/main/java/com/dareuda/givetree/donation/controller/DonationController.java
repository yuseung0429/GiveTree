package com.dareuda.givetree.donation.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.donation.controller.dto.DonateToCampaignRequest;
import com.dareuda.givetree.donation.domain.dto.DonateToFoundationCommand;
import com.dareuda.givetree.donation.service.DonationService;
import com.dareuda.givetree.donation.controller.dto.DonateToFoundationRequest;
import com.dareuda.givetree.donation.domain.DonationOption;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DonationController {
    private final DonationService donationService;

    @PostMapping("/foundations/{foundationId}/donate")
    public ResponseEntity<Void> donateToFoundation(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long foundationId,
            @RequestParam(defaultValue = "one-time") String option,
            @RequestBody DonateToFoundationRequest request
    ) {
        donationService.donateToFoundation(
                DonateToFoundationCommand.builder()
                        .memberId(userPrinciple.getId())
                        .foundationId(foundationId)
                        .amount(request.getAmount())
                        .message(request.getMessage())
                        .simplePassword(request.getSimplePassword())
                        .build(),
                DonationOption.fromToken(option)
        );

        return ResponseEntity.ok().build();
    }

    @PostMapping("/campaigns/{campaignId}/donate")
    public ResponseEntity<Void> donateToCampaign(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long campaignId,
            @RequestBody DonateToCampaignRequest request
    ) {
        donationService.donateToCampaign(
                userPrinciple.getId(),
                campaignId,
                request.getAmount(),
                request.getMessage(),
                request.getSimplePassword()
        );

        return ResponseEntity.ok().build();
    }
}
