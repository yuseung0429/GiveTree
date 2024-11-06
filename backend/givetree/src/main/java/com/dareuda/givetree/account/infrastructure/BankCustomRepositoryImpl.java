package com.dareuda.givetree.account.infrastructure;

import com.dareuda.givetree.account.domain.Bank;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class BankCustomRepositoryImpl implements BankCustomRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void saveAll(List<Bank> banks) {


        jdbcTemplate.batchUpdate("INSERT INTO bank(bank_code, name) values (?, ?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setString(1, banks.get(i).getCode());
                        ps.setString(2, banks.get(i).getName());
                    }

                    @Override
                    public int getBatchSize() {
                        return banks.size();
                    }
                });
    }
}