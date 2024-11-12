package com.dareuda.givetree.category.infrastructure;

import com.dareuda.givetree.category.domain.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends Repository<Category, Integer> {
    Category save(Category category);
    Optional<Category> findByName(String name);

    @Query("""
        SELECT DISTINCT c.name
        FROM Category c
        JOIN FoundationCategory fc
        ON c = fc.category
        ORDER BY c.name
    """)
    List<String> findAllFoundationCategories();
}
