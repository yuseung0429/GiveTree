package com.dareuda.givetree.campaign.controller;

import com.dareuda.givetree.campaign.controller.dto.request.CreateCampaignRequest;
import com.dareuda.givetree.campaign.domain.dto.CampaignDetail;
import com.dareuda.givetree.campaign.service.CampaignService;
import com.dareuda.givetree.campaign.controller.dto.request.UpdateCampaignRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/campaigns")
public class CampaignController {
    private final CampaignService campaignService;

    private final static long TEMP_MEMBER_ID = 1L;

    @PostMapping
    public ResponseEntity<Void> createCampaign(@Valid @RequestBody CreateCampaignRequest request) {
        long campaignId = campaignService.createCampaign(request.convertToCommand());

        return ResponseEntity.created(
                        UriComponentsBuilder
                                .fromPath("/campaigns/{campaignId}")
                                .buildAndExpand(campaignId)
                                .toUri()
                )
                .build();
    }

    @PatchMapping("/{campaignId}")
    public ResponseEntity<Void> updateCampaign(@PathVariable long campaignId, @Valid @RequestBody UpdateCampaignRequest request) {
        campaignService.updateCampaign(TEMP_MEMBER_ID, campaignId, request.convertToCommand());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{campaignId}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable long campaignId) {
        campaignService.deleteCampaign(TEMP_MEMBER_ID, campaignId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{campaignId}")
    public ResponseEntity<CampaignDetail> getCampaignDetail(@PathVariable long campaignId) {
        CampaignDetail campaignDetail = campaignService.getCampaignDetail(campaignId);

        return ResponseEntity.ok(campaignDetail);
    }
}
