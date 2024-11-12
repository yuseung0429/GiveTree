package com.dareuda.givetree.foundation.service;

import com.dareuda.givetree.foundation.domain.*;
import com.dareuda.givetree.foundation.domain.dto.FoundationSearchFilter;
import com.dareuda.givetree.foundation.domain.dto.UpdateFoundationCommand;
import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoundationService {
    private final FoundationCreator foundationCreator;
    private final FoundationDetailReader foundationDetailReader;
    private final FoundationUpdater foundationUpdater;
    private final FoundationDetailSearcher foundationDetailSearcher;
    private final FoundationCategoryFinder foundationCategoryFinder;

    public long createFoundation(CreateFoundationCommand command) {
        return foundationCreator.create(command).getId();
    }

    public void updateFoundation(long foundationId, UpdateFoundationCommand command) {
        foundationUpdater.update(foundationId, command);
    }

    public FoundationDetail getFoundationDetail(long foundationId) {
        return foundationDetailReader.read(foundationId);
    }

    public Page<FoundationDetail> searchFoundationDetail(FoundationSearchFilter filter, Pageable pageable) {
        return foundationDetailSearcher.searchFoundations(filter, pageable);
    }

    public List<String> getAllCategories() {
        return foundationCategoryFinder.findAll();
    }
}
