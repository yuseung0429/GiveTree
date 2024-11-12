package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.category.infrastructure.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationCategoryFinder {
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<String> findAll() {
        return categoryRepository.findAllFoundationCategories();
    }
}
