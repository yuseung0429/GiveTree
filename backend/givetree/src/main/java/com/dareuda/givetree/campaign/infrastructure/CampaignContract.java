package com.dareuda.givetree.campaign.infrastructure;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the
 * <a href="https://github.com/hyperledger/web3j/tree/main/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.6.1.
 */
@SuppressWarnings("rawtypes")
public class CampaignContract extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b50604051610a07380380610a07833981810160405281019061003291906101b1565b8042111561003f57600080fd5b836000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550426004819055508060058190555050505050610218565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101488261011d565b9050919050565b6101588161013d565b811461016357600080fd5b50565b6000815190506101758161014f565b92915050565b6000819050919050565b61018e8161017b565b811461019957600080fd5b50565b6000815190506101ab81610185565b92915050565b600080600080608085870312156101cb576101ca610118565b5b60006101d987828801610166565b94505060206101ea87828801610166565b93505060406101fb87828801610166565b925050606061020c8782880161019c565b91505092959194509250565b6107e0806102276000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806378e979251161005b57806378e9792514610105578063811e539c14610123578063c74073a114610141578063e69d849d1461015d57610088565b80631338f4931461008d5780631a39d8ef146100ab5780633197cbb6146100c957806341fbb050146100e7575b600080fd5b610095610179565b6040516100a29190610572565b60405180910390f35b6100b361018c565b6040516100c091906105a6565b60405180910390f35b6100d1610192565b6040516100de91906105a6565b60405180910390f35b6100ef610198565b6040516100fc9190610602565b60405180910390f35b61010d6101be565b60405161011a91906105a6565b60405180910390f35b61012b6101c4565b6040516101389190610602565b60405180910390f35b61015b6004803603810190610156919061064e565b6101ea565b005b610177600480360381019061017291906106a7565b6103bd565b005b600660009054906101000a900460ff1681565b60035481565b60055481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600660009054906101000a900460ff161561020457600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461025e57600080fd5b42600554111561026d57600080fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f5537ede600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166003546040518463ffffffff1660e01b8152600401610310939291906106e7565b600060405180830381600087803b15801561032a57600080fd5b505af115801561033e573d6000803e3d6000fd5b505050506001600660006101000a81548160ff0219169083151502179055507f2c629722b76d10ed34ae2afdc7a2ea6ac0793f88ab619bce6027606665eb1dce600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166003546040516103b292919061071e565b60405180910390a150565b600660009054906101000a900460ff16156103d757600080fd5b42600554116103e557600080fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f5537ede83600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518463ffffffff1660e01b8152600401610464939291906106e7565b600060405180830381600087803b15801561047e57600080fd5b505af1158015610492573d6000803e3d6000fd5b5050505080600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104e59190610776565b9250508190555080600360008282546104fe9190610776565b925050819055508173ffffffffffffffffffffffffffffffffffffffff167f264f630d9efa0d07053a31163641d9fcc0adafc9d9e76f1c37c2ce3a558d2c528260405161054b91906105a6565b60405180910390a25050565b60008115159050919050565b61056c81610557565b82525050565b60006020820190506105876000830184610563565b92915050565b6000819050919050565b6105a08161058d565b82525050565b60006020820190506105bb6000830184610597565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006105ec826105c1565b9050919050565b6105fc816105e1565b82525050565b600060208201905061061760008301846105f3565b92915050565b600080fd5b61062b816105e1565b811461063657600080fd5b50565b60008135905061064881610622565b92915050565b6000602082840312156106645761066361061d565b5b600061067284828501610639565b91505092915050565b6106848161058d565b811461068f57600080fd5b50565b6000813590506106a18161067b565b92915050565b600080604083850312156106be576106bd61061d565b5b60006106cc85828601610639565b92505060206106dd85828601610692565b9150509250929050565b60006060820190506106fc60008301866105f3565b61070960208301856105f3565b6107166040830184610597565b949350505050565b600060408201905061073360008301856105f3565b6107406020830184610597565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006107818261058d565b915061078c8361058d565b92508282019050808211156107a4576107a3610747565b5b9291505056fea2646970667358221220b692a7b61c19e799a7b49d1a20140d3e54b128d366b30ea73a7fe32a22f52ea864736f6c634300081b0033";

    private static String librariesLinkedBinary;

    public static final String FUNC_CAMPAIGN = "campaign";

    public static final String FUNC_CLOSE = "close";

    public static final String FUNC_DONATE = "donate";

    public static final String FUNC_ENDTIME = "endTime";

    public static final String FUNC_FOUNDATION = "foundation";

    public static final String FUNC_ISCLOSE = "isClose";

    public static final String FUNC_STARTTIME = "startTime";

    public static final String FUNC_TOTALAMOUNT = "totalAmount";

    public static final Event CAMPAIGNCLOSED_EVENT = new Event("CampaignClosed",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event DONATIONRECEIVED_EVENT = new Event("DonationReceived",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    @Deprecated
    protected CampaignContract(String contractAddress, Web3j web3j, Credentials credentials,
                               BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected CampaignContract(String contractAddress, Web3j web3j, Credentials credentials,
                               ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected CampaignContract(String contractAddress, Web3j web3j,
                               TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected CampaignContract(String contractAddress, Web3j web3j,
                               TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<CampaignClosedEventResponse> getCampaignClosedEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(CAMPAIGNCLOSED_EVENT, transactionReceipt);
        ArrayList<CampaignClosedEventResponse> responses = new ArrayList<CampaignClosedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            CampaignClosedEventResponse typedResponse = new CampaignClosedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.foundation = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.totalAmount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static CampaignClosedEventResponse getCampaignClosedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(CAMPAIGNCLOSED_EVENT, log);
        CampaignClosedEventResponse typedResponse = new CampaignClosedEventResponse();
        typedResponse.log = log;
        typedResponse.foundation = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.totalAmount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<CampaignClosedEventResponse> campaignClosedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getCampaignClosedEventFromLog(log));
    }

    public Flowable<CampaignClosedEventResponse> campaignClosedEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(CAMPAIGNCLOSED_EVENT));
        return campaignClosedEventFlowable(filter);
    }

    public static List<DonationReceivedEventResponse> getDonationReceivedEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(DONATIONRECEIVED_EVENT, transactionReceipt);
        ArrayList<DonationReceivedEventResponse> responses = new ArrayList<DonationReceivedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            DonationReceivedEventResponse typedResponse = new DonationReceivedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.donor = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static DonationReceivedEventResponse getDonationReceivedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(DONATIONRECEIVED_EVENT, log);
        DonationReceivedEventResponse typedResponse = new DonationReceivedEventResponse();
        typedResponse.log = log;
        typedResponse.donor = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<DonationReceivedEventResponse> donationReceivedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getDonationReceivedEventFromLog(log));
    }

    public Flowable<DonationReceivedEventResponse> donationReceivedEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(DONATIONRECEIVED_EVENT));
        return donationReceivedEventFlowable(filter);
    }

    public RemoteFunctionCall<String> campaign() {
        final Function function = new Function(FUNC_CAMPAIGN,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> close(String _foundation) {
        final Function function = new Function(
                FUNC_CLOSE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _foundation)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> donate(String donor, BigInteger amount) {
        final Function function = new Function(
                FUNC_DONATE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, donor),
                        new org.web3j.abi.datatypes.generated.Uint256(amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> endTime() {
        final Function function = new Function(FUNC_ENDTIME,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> foundation() {
        final Function function = new Function(FUNC_FOUNDATION,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<Boolean> isClose() {
        final Function function = new Function(FUNC_ISCLOSE,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<BigInteger> startTime() {
        final Function function = new Function(FUNC_STARTTIME,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> totalAmount() {
        final Function function = new Function(FUNC_TOTALAMOUNT,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    @Deprecated
    public static CampaignContract load(String contractAddress, Web3j web3j,
                                        Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new CampaignContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static CampaignContract load(String contractAddress, Web3j web3j,
                                        TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new CampaignContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static CampaignContract load(String contractAddress, Web3j web3j,
                                        Credentials credentials, ContractGasProvider contractGasProvider) {
        return new CampaignContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static CampaignContract load(String contractAddress, Web3j web3j,
                                        TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new CampaignContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<CampaignContract> deploy(Web3j web3j, Credentials credentials,
                                                      ContractGasProvider contractGasProvider, String _tokenContract, String _foundation,
                                                      String _campaign, BigInteger _endTime) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.Address(160, _foundation),
                new org.web3j.abi.datatypes.Address(160, _campaign),
                new org.web3j.abi.datatypes.generated.Uint256(_endTime)));
        return deployRemoteCall(CampaignContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<CampaignContract> deploy(Web3j web3j,
                                                      TransactionManager transactionManager, ContractGasProvider contractGasProvider,
                                                      String _tokenContract, String _foundation, String _campaign, BigInteger _endTime) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.Address(160, _foundation),
                new org.web3j.abi.datatypes.Address(160, _campaign),
                new org.web3j.abi.datatypes.generated.Uint256(_endTime)));
        return deployRemoteCall(CampaignContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<CampaignContract> deploy(Web3j web3j, Credentials credentials,
                                                      BigInteger gasPrice, BigInteger gasLimit, String _tokenContract, String _foundation,
                                                      String _campaign, BigInteger _endTime) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.Address(160, _foundation),
                new org.web3j.abi.datatypes.Address(160, _campaign),
                new org.web3j.abi.datatypes.generated.Uint256(_endTime)));
        return deployRemoteCall(CampaignContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<CampaignContract> deploy(Web3j web3j,
                                                      TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
                                                      String _tokenContract, String _foundation, String _campaign, BigInteger _endTime) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.Address(160, _foundation),
                new org.web3j.abi.datatypes.Address(160, _campaign),
                new org.web3j.abi.datatypes.generated.Uint256(_endTime)));
        return deployRemoteCall(CampaignContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    public static void linkLibraries(List<Contract.LinkReference> references) {
        librariesLinkedBinary = linkBinaryWithReferences(BINARY, references);
    }

    private static String getDeploymentBinary() {
        if (librariesLinkedBinary != null) {
            return librariesLinkedBinary;
        } else {
            return BINARY;
        }
    }

    public static class CampaignClosedEventResponse extends BaseEventResponse {
        public String foundation;

        public BigInteger totalAmount;
    }

    public static class DonationReceivedEventResponse extends BaseEventResponse {
        public String donor;

        public BigInteger amount;
    }
}
