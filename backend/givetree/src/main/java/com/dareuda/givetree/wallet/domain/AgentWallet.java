package com.dareuda.givetree.wallet.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@SuperBuilder
@Table(name = "agent_wallet")
@DiscriminatorValue("a")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AgentWallet extends Wallet {
}
