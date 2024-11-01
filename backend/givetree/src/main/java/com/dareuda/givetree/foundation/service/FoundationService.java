package com.dareuda.givetree.foundation.service;

import com.dareuda.givetree.foundation.controller.dto.request.CreateFoundationRequest;
import com.dareuda.givetree.foundation.domain.FoundationCreator;
import com.dareuda.givetree.foundation.domain.FoundationDetail;
import com.dareuda.givetree.foundation.domain.FoundationDetailReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FoundationService {
    private final FoundationCreator foundationCreator;
    private final FoundationDetailReader foundationDetailReader;

    public long createFoundation(CreateFoundationRequest request) {
        return foundationCreator.create(request);
    }

    public FoundationDetail getFoundationDetailByMemberId(long memberId) {
        return foundationDetailReader.readByMemberId(memberId);
    }
}
