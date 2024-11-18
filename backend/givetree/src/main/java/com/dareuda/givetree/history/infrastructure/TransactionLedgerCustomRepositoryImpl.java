package com.dareuda.givetree.history.infrastructure;

import com.dareuda.givetree.history.domain.TransactionLedger;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TransactionLedgerCustomRepositoryImpl implements TransactionLedgerCustomRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void saveAll(List<TransactionLedger> transactionLedgers) {
        jdbcTemplate.batchUpdate("INSERT INTO transaction_ledger(transaction_id, ledger_id) values (?, ?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, transactionLedgers.get(i).getTransaction().getId());
                        ps.setLong(2, transactionLedgers.get(i).getLedger().getId());
                    }

                    @Override
                    public int getBatchSize() {
                        return transactionLedgers.size();
                    }
                });
    }
}
