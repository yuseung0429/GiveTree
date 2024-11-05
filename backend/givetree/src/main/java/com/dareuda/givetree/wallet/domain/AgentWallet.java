package com.dareuda.givetree.wallet.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@SuperBuilder
@Table(name = "agent_wallet")
@DiscriminatorValue("a")
public class AgentWallet extends Wallet{
    public AgentWallet() { }
}
