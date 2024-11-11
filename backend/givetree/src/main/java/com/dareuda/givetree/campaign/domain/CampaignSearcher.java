package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.CampaignDetail;
import com.dareuda.givetree.campaign.domain.dto.CampaignSearchFilter;
import com.dareuda.givetree.campaign.infrastructure.CampaignQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CampaignSearcher {
    private final CampaignQueryRepository campaignQueryRepository;
    private final CampaignDetailReader campaignDetailReader;

    @Transactional(readOnly = true)
    public Page<CampaignDetail> searchFoundations(CampaignSearchFilter filter, Pageable pageable) {
        Page<Campaign> foundationPage = campaignQueryRepository.getCampaignPage(filter, pageable);

        List<CampaignDetail> postDetails = foundationPage.stream()
                .map(campaignDetailReader::read)
                .toList();

        return new PageImpl<>(postDetails, foundationPage.getPageable(), foundationPage.getTotalElements());
    }
}
