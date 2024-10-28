package com.dareuda.givetree.wallet.domain;

import com.dareuda.givetree.common.utils.ByteArrayToHexStringConverter;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "wallet")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wallet_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "address")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String address;

    @Column(name = "private_key")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String privateKey;
}
