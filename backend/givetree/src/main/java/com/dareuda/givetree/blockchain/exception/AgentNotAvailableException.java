package com.dareuda.givetree.blockchain.exception;

public class AgentNotAvailableException extends EthereumException {
    public AgentNotAvailableException() {
        super("사용 가능한 에이전트가 없습니다.", null);
    }
}