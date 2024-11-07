package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.media.domain.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FoundationImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "foundation_image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foundation_id")
    @NotNull
    private Foundation foundation;

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "image_id")
    @NotNull
    private Image image;

    @Column
    @NotNull
    private int imageOrder;

    public FoundationImage(Foundation foundation, Image image, int imageOrder) {
        this.foundation = foundation;
        this.image = image;
        this.imageOrder = imageOrder;
    }
}
