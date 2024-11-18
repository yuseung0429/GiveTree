package com.dareuda.givetree.category.domain;

import com.dareuda.givetree.foundation.domain.Foundation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FoundationCategory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foundation_id")
    @NotNull
    private Foundation foundation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @NotNull
    private Category category;

    public FoundationCategory(Foundation foundation, Category category) {
        this.foundation = foundation;
        this.category = category;
    }
}
