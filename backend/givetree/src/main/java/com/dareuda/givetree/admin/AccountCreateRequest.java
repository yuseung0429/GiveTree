package com.dareuda.givetree.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountCreateRequest {
    private String email;
    private String accountTypeUniqueNo;
}
