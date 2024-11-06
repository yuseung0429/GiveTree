package com.dareuda.givetree.foundation.service;

import com.dareuda.givetree.foundation.domain.*;
import com.dareuda.givetree.foundation.domain.dto.UpdateFoundationCommand;
import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FoundationService {
    private final FoundationCreator foundationCreator;
    private final FoundationDetailReader foundationDetailReader;
    private final FoundationUpdater foundationUpdater;
    private final FoundationDeleter foundationDeleter;
    private final FoundationAuthorityValidator foundationAuthorityValidator;

    public long createFoundation(long memberId, CreateFoundationCommand command) {
        return foundationCreator.create(memberId, command);
    }

    public void updateFoundation(long memberId, long foundationId, UpdateFoundationCommand command) {
        foundationAuthorityValidator.validateModifyAuthority(memberId, foundationId);

        foundationUpdater.update(foundationId, command);
    }

    public void deleteFoundation(long memberId, long foundationId) {
        foundationAuthorityValidator.validateModifyAuthority(memberId, foundationId);

        foundationDeleter.delete(foundationId);
    }

    public FoundationDetail getFoundationDetail(long foundationId) {
        return foundationDetailReader.read(foundationId);
    }

    public FoundationDetail getFoundationDetailByMemberId(long memberId) {
        return foundationDetailReader.readByMemberId(memberId);
    }
}
