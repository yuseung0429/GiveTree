package com.dareuda.givetree.blockchain.errors.exception;

public class AgentNotAvailableException extends EthereumException {
    private static final String MESSAGE = "사용 가능한 에이전트가 없습니다.";

    public AgentNotAvailableException() {
        super(MESSAGE);
    }

    public AgentNotAvailableException(Exception e) {
        super(MESSAGE, e);
    }
}