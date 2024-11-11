package com.dareuda.givetree.campaign.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.campaign.controller.dto.request.CreateCampaignRequest;
import com.dareuda.givetree.campaign.controller.dto.request.SearchCampaignRequest;
import com.dareuda.givetree.campaign.domain.dto.CampaignDetail;
import com.dareuda.givetree.campaign.service.CampaignService;
import com.dareuda.givetree.campaign.controller.dto.request.UpdateCampaignRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/campaigns")
public class CampaignController {
    private final CampaignService campaignService;

    @PostMapping
    public ResponseEntity<Void> createCampaign(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @Valid @RequestBody CreateCampaignRequest request
    ) {
        long campaignId = campaignService.createCampaign(userPrinciple.getId(), request.convertToCommand());

        return ResponseEntity.created(
                        UriComponentsBuilder
                                .fromPath("/campaigns/{campaignId}")
                                .buildAndExpand(campaignId)
                                .toUri()
                )
                .build();
    }

    @PatchMapping("/{campaignId}")
    public ResponseEntity<Void> updateCampaign(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long campaignId,
            @Valid @RequestBody UpdateCampaignRequest request
    ) {
        campaignService.updateCampaign(userPrinciple.getId(), campaignId, request.convertToCommand());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{campaignId}")
    public ResponseEntity<Void> deleteCampaign(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long campaignId
    ) {
        campaignService.deleteCampaign(userPrinciple.getId(), campaignId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{campaignId}")
    public ResponseEntity<CampaignDetail> getCampaignDetail(@PathVariable long campaignId) {
        CampaignDetail campaignDetail = campaignService.getCampaignDetail(campaignId);

        return ResponseEntity.ok(campaignDetail);
    }

    @GetMapping
    public ResponseEntity<Page<CampaignDetail>> searchFoundations(
            SearchCampaignRequest request,
            @PageableDefault Pageable pageable
    ) {
        Page<CampaignDetail> campaignDetails = campaignService.searchFoundationDetail(request.convertToSearchFilter(), pageable);

        return ResponseEntity.ok(campaignDetails);
    }

}
