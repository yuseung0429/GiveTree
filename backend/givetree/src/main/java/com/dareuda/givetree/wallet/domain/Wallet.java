package com.dareuda.givetree.wallet.domain;

import com.dareuda.givetree.common.utils.ByteArrayToHexStringConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@SuperBuilder
@Table(name = "wallet")
@DiscriminatorColumn(name = "type")
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wallet_id")
    private Long id;

    @NotNull
    @Column(name = "address")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String address;

    @NotNull
    @Column(name = "private_key")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String privateKey;
}