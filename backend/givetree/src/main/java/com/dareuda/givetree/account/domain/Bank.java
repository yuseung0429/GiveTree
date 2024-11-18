package com.dareuda.givetree.account.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Entity
@Table(name = "bank")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bank {
    @Id
    @Column(name = "bank_code")
    private String code;

    @NotNull
    @Column(name = "name")
    private String name;
}
