package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Campaign extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "campaign_id")
    private Long id;
}
