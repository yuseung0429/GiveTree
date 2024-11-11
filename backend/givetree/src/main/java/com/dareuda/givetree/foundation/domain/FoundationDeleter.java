package com.dareuda.givetree.foundation.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationDeleter {
    private final FoundationReader foundationReader;

    @Transactional
    public void delete(long foundationId) {
        Foundation foundation = foundationReader.read(foundationId);
        foundation.getMember().delete();
    }
}
