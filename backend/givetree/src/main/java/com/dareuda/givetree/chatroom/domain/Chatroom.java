package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import com.dareuda.givetree.sale.domain.Sale;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chatroom extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id")
    @NotNull
    private Sale sale;

    public Chatroom(Sale sale) {
        this.sale = sale;
    }
}
