package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.foundation.domain.dto.FoundationSearchFilter;
import com.dareuda.givetree.foundation.infrastructure.FoundationQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationDetailSearcher {
    private final FoundationQueryRepository foundationQueryRepository;
    private final FoundationDetailReader foundationDetailReader;

    @Transactional(readOnly = true)
    public Page<FoundationDetail> searchFoundations(FoundationSearchFilter filter, Pageable pageable) {
        Page<Foundation> foundationPage = foundationQueryRepository.getFoundationPage(filter, pageable);

        List<FoundationDetail> postDetails = foundationPage.stream()
                .map(foundationDetailReader::read)
                .toList();

        return new PageImpl<>(postDetails, foundationPage.getPageable(), foundationPage.getTotalElements());
    }
}
