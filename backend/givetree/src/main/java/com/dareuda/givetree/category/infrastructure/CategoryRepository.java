package com.dareuda.givetree.category.infrastructure;

import com.dareuda.givetree.category.domain.Category;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface CategoryRepository extends Repository<Category, Integer> {
    Category save(Category category);
    Optional<Category> findByName(String name);
}
