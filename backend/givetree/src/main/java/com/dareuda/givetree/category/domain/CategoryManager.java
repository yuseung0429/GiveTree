package com.dareuda.givetree.category.domain;

import com.dareuda.givetree.category.infrastructure.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CategoryManager {
    private final CategoryRepository categoryRepository;

    /**
     * DB에서 카테고리를 찾아 반환. 만약 없다면 삽입 후 반환.
     * @param categoryName 카테고리 이름
     * @return 조회된 카테고리
     */
    @Transactional
    public Category getCategory(String categoryName) {
        return categoryRepository.findByName(categoryName)
                .orElseGet(() -> categoryRepository.save(new Category(categoryName)));
    }
}
