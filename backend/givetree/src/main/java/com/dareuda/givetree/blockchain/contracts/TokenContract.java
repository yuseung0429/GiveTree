package com.dareuda.givetree.blockchain.contracts;

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
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
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
public class TokenContract extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b5060405162001c8f38038062001c8f833981810160405281019062000037919062000420565b6040518060400160405280600a81526020017f4747554c20546f6b656e000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f4747554c000000000000000000000000000000000000000000000000000000008152508160039081620000b49190620006c2565b508060049081620000c69190620006c2565b50505033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200011c33826200012360201b60201c565b50620008e0565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620001985760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016200018f9190620007ee565b60405180910390fd5b620001ac60008383620001b060201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160362000206578060026000828254620001f991906200083a565b92505081905550620002dc565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101562000295578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016200028c9392919062000886565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000327578060026000828254039250508190555062000374565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003d39190620008c3565b60405180910390a3505050565b600080fd5b6000819050919050565b620003fa81620003e5565b81146200040657600080fd5b50565b6000815190506200041a81620003ef565b92915050565b600060208284031215620004395762000438620003e0565b5b6000620004498482850162000409565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004d457607f821691505b602082108103620004ea57620004e96200048c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000515565b62000560868362000515565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620005a36200059d6200059784620003e5565b62000578565b620003e5565b9050919050565b6000819050919050565b620005bf8362000582565b620005d7620005ce82620005aa565b84845462000522565b825550505050565b600090565b620005ee620005df565b620005fb818484620005b4565b505050565b5b81811015620006235762000617600082620005e4565b60018101905062000601565b5050565b601f82111562000672576200063c81620004f0565b620006478462000505565b8101602085101562000657578190505b6200066f620006668562000505565b83018262000600565b50505b505050565b600082821c905092915050565b6000620006976000198460080262000677565b1980831691505092915050565b6000620006b2838362000684565b9150826002028217905092915050565b620006cd8262000452565b67ffffffffffffffff811115620006e957620006e86200045d565b5b620006f58254620004bb565b6200070282828562000627565b600060209050601f8311600181146200073a576000841562000725578287015190505b620007318582620006a4565b865550620007a1565b601f1984166200074a86620004f0565b60005b8281101562000774578489015182556001820191506020850194506020810190506200074d565b8683101562000794578489015162000790601f89168262000684565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620007d682620007a9565b9050919050565b620007e881620007c9565b82525050565b6000602082019050620008056000830184620007dd565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200084782620003e5565b91506200085483620003e5565b92508282019050808211156200086f576200086e6200080b565b5b92915050565b6200088081620003e5565b82525050565b60006060820190506200089d6000830186620007dd565b620008ac602083018562000875565b620008bb604083018462000875565b949350505050565b6000602082019050620008da600083018462000875565b92915050565b61139f80620008f06000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c8063519888e411610097578063a9059cbb11610066578063a9059cbb14610271578063dd62ed3e146102a1578063f5537ede146102d1578063f5ff5c76146102ed576100f4565b8063519888e4146101eb57806370a082311461020757806395d89b4114610237578063a0712d6814610255576100f4565b8063095ea7b3116100d3578063095ea7b31461014f57806318160ddd1461017f57806323b872dd1461019d578063313ce567146101cd576100f4565b8062533577146100f9578063028eab221461011557806306fdde0314610131575b600080fd5b610113600480360381019061010e9190610f99565b61030b565b005b61012f600480360381019061012a9190610f99565b6103c0565b005b610139610475565b6040516101469190611056565b60405180910390f35b610169600480360381019061016491906110ae565b610507565b6040516101769190611109565b60405180910390f35b61018761052a565b6040516101949190611133565b60405180910390f35b6101b760048036038101906101b2919061114e565b610534565b6040516101c49190611109565b60405180910390f35b6101d5610563565b6040516101e291906111bd565b60405180910390f35b610205600480360381019061020091906110ae565b610568565b005b610221600480360381019061021c9190610f99565b610647565b60405161022e9190611133565b60405180910390f35b61023f61068f565b60405161024c9190611056565b60405180910390f35b61026f600480360381019061026a91906111d8565b610721565b005b61028b600480360381019061028691906110ae565b610788565b6040516102989190611109565b60405180910390f35b6102bb60048036038101906102b69190611205565b6107ab565b6040516102c89190611133565b60405180910390f35b6102eb60048036038101906102e6919061114e565b610832565b005b6102f56108f0565b6040516103029190611254565b60405180910390f35b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461036557600080fd5b6001600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461041a57600080fd5b6001600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6060600380546104849061129e565b80601f01602080910402602001604051908101604052809291908181526020018280546104b09061129e565b80156104fd5780601f106104d2576101008083540402835291602001916104fd565b820191906000526020600020905b8154815290600101906020018083116104e057829003601f168201915b5050505050905090565b600080610512610916565b905061051f81858561091e565b600191505092915050565b6000600254905090565b60008061053f610916565b905061054c858285610930565b6105578585856109c4565b60019150509392505050565b600090565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff168061060d57503373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b61061657600080fd5b61064382600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836109c4565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461069e9061129e565b80601f01602080910402602001604051908101604052809291908181526020018280546106ca9061129e565b80156107175780601f106106ec57610100808354040283529160200191610717565b820191906000526020600020905b8154815290600101906020018083116106fa57829003601f168201915b5050505050905090565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461077b57600080fd5b6107853382610ab8565b50565b600080610793610916565b90506107a08185856109c4565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16806108d757503373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b6108e057600080fd5b6108eb8383836109c4565b505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b61092b8383836001610b3a565b505050565b600061093c84846107ab565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146109be57818110156109ae578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016109a5939291906112cf565b60405180910390fd5b6109bd84848484036000610b3a565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a365760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610a2d9190611254565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610aa85760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610a9f9190611254565b60405180910390fd5b610ab3838383610d11565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b2a5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610b219190611254565b60405180910390fd5b610b3660008383610d11565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610bac5760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610ba39190611254565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610c1e5760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610c159190611254565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610d0b578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610d029190611133565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610d63578060026000828254610d579190611335565b92505081905550610e36565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610def578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610de6939291906112cf565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e7f5780600260008282540392505081905550610ecc565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610f299190611133565b60405180910390a3505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f6682610f3b565b9050919050565b610f7681610f5b565b8114610f8157600080fd5b50565b600081359050610f9381610f6d565b92915050565b600060208284031215610faf57610fae610f36565b5b6000610fbd84828501610f84565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611000578082015181840152602081019050610fe5565b60008484015250505050565b6000601f19601f8301169050919050565b600061102882610fc6565b6110328185610fd1565b9350611042818560208601610fe2565b61104b8161100c565b840191505092915050565b60006020820190508181036000830152611070818461101d565b905092915050565b6000819050919050565b61108b81611078565b811461109657600080fd5b50565b6000813590506110a881611082565b92915050565b600080604083850312156110c5576110c4610f36565b5b60006110d385828601610f84565b92505060206110e485828601611099565b9150509250929050565b60008115159050919050565b611103816110ee565b82525050565b600060208201905061111e60008301846110fa565b92915050565b61112d81611078565b82525050565b60006020820190506111486000830184611124565b92915050565b60008060006060848603121561116757611166610f36565b5b600061117586828701610f84565b935050602061118686828701610f84565b925050604061119786828701611099565b9150509250925092565b600060ff82169050919050565b6111b7816111a1565b82525050565b60006020820190506111d260008301846111ae565b92915050565b6000602082840312156111ee576111ed610f36565b5b60006111fc84828501611099565b91505092915050565b6000806040838503121561121c5761121b610f36565b5b600061122a85828601610f84565b925050602061123b85828601610f84565b9150509250929050565b61124e81610f5b565b82525050565b60006020820190506112696000830184611245565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806112b657607f821691505b6020821081036112c9576112c861126f565b5b50919050565b60006060820190506112e46000830186611245565b6112f16020830185611124565b6112fe6040830184611124565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061134082611078565b915061134b83611078565b925082820190508082111561136357611362611306565b5b9291505056fea2646970667358221220c8aa05b6df20fe7a6adadfd068d2ea1ecc593b0a8552412fd8f545e40d06d9a364736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_AGENT = "agent";

    public static final String FUNC_ALLOWANCE = "allowance";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_DECIMALS = "decimals";

    public static final String FUNC_MINT = "mint";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_REGISTERTRANSFERTOKENALLOWEDCONTRACTLIST = "registerTransferTokenAllowedContractList";

    public static final String FUNC_REGISTERUSETOKENALLOWEDCONTRACTLIST = "registerUseTokenAllowedContractList";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_TRANSFER = "transfer";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final String FUNC_TRANSFERTOKEN = "transferToken";

    public static final String FUNC_USETOKEN = "useToken";

    public static final Event APPROVAL_EVENT = new Event("Approval",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event TRANSFER_EVENT = new Event("Transfer",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    @Deprecated
    protected TokenContract(String contractAddress, Web3j web3j, Credentials credentials,
                            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected TokenContract(String contractAddress, Web3j web3j, Credentials credentials,
                            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected TokenContract(String contractAddress, Web3j web3j,
                            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected TokenContract(String contractAddress, Web3j web3j,
                            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<ApprovalEventResponse> getApprovalEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(APPROVAL_EVENT, transactionReceipt);
        ArrayList<ApprovalEventResponse> responses = new ArrayList<ApprovalEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ApprovalEventResponse typedResponse = new ApprovalEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ApprovalEventResponse getApprovalEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(APPROVAL_EVENT, log);
        ApprovalEventResponse typedResponse = new ApprovalEventResponse();
        typedResponse.log = log;
        typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getApprovalEventFromLog(log));
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(DefaultBlockParameter startBlock,
                                                                 DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(APPROVAL_EVENT));
        return approvalEventFlowable(filter);
    }

    public static List<TransferEventResponse> getTransferEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(TRANSFER_EVENT, transactionReceipt);
        ArrayList<TransferEventResponse> responses = new ArrayList<TransferEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            TransferEventResponse typedResponse = new TransferEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static TransferEventResponse getTransferEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(TRANSFER_EVENT, log);
        TransferEventResponse typedResponse = new TransferEventResponse();
        typedResponse.log = log;
        typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<TransferEventResponse> transferEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getTransferEventFromLog(log));
    }

    public Flowable<TransferEventResponse> transferEventFlowable(DefaultBlockParameter startBlock,
                                                                 DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TRANSFER_EVENT));
        return transferEventFlowable(filter);
    }

    public RemoteFunctionCall<String> agent() {
        final Function function = new Function(FUNC_AGENT,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> allowance(String owner, String spender) {
        final Function function = new Function(FUNC_ALLOWANCE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, owner),
                        new org.web3j.abi.datatypes.Address(160, spender)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> approve(String spender, BigInteger value) {
        final Function function = new Function(
                FUNC_APPROVE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, spender),
                        new org.web3j.abi.datatypes.generated.Uint256(value)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> balanceOf(String account) {
        final Function function = new Function(FUNC_BALANCEOF,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, account)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> decimals() {
        final Function function = new Function(FUNC_DECIMALS,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> mint(BigInteger _amount) {
        final Function function = new Function(
                FUNC_MINT,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> name() {
        final Function function = new Function(FUNC_NAME,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> registerTransferTokenAllowedContractList(
            String _contractAddress) {
        final Function function = new Function(
                FUNC_REGISTERTRANSFERTOKENALLOWEDCONTRACTLIST,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _contractAddress)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> registerUseTokenAllowedContractList(
            String _contractAddress) {
        final Function function = new Function(
                FUNC_REGISTERUSETOKENALLOWEDCONTRACTLIST,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _contractAddress)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> symbol() {
        final Function function = new Function(FUNC_SYMBOL,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> totalSupply() {
        final Function function = new Function(FUNC_TOTALSUPPLY,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> transfer(String to, BigInteger value) {
        final Function function = new Function(
                FUNC_TRANSFER,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(value)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> transferFrom(String from, String to,
                                                               BigInteger value) {
        final Function function = new Function(
                FUNC_TRANSFERFROM,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from),
                        new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(value)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> transferToken(String _from, String _to,
                                                                BigInteger _amount) {
        final Function function = new Function(
                FUNC_TRANSFERTOKEN,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _from),
                        new org.web3j.abi.datatypes.Address(160, _to),
                        new org.web3j.abi.datatypes.generated.Uint256(_amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> useToken(String _spender, BigInteger _amount) {
        final Function function = new Function(
                FUNC_USETOKEN,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _spender),
                        new org.web3j.abi.datatypes.generated.Uint256(_amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static TokenContract load(String contractAddress, Web3j web3j, Credentials credentials,
                                     BigInteger gasPrice, BigInteger gasLimit) {
        return new TokenContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static TokenContract load(String contractAddress, Web3j web3j,
                                     TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new TokenContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static TokenContract load(String contractAddress, Web3j web3j, Credentials credentials,
                                     ContractGasProvider contractGasProvider) {
        return new TokenContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static TokenContract load(String contractAddress, Web3j web3j,
                                     TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new TokenContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<TokenContract> deploy(Web3j web3j, Credentials credentials,
                                                   ContractGasProvider contractGasProvider, BigInteger initialSupply) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initialSupply)));
        return deployRemoteCall(TokenContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<TokenContract> deploy(Web3j web3j,
                                                   TransactionManager transactionManager, ContractGasProvider contractGasProvider,
                                                   BigInteger initialSupply) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initialSupply)));
        return deployRemoteCall(TokenContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<TokenContract> deploy(Web3j web3j, Credentials credentials,
                                                   BigInteger gasPrice, BigInteger gasLimit, BigInteger initialSupply) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initialSupply)));
        return deployRemoteCall(TokenContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<TokenContract> deploy(Web3j web3j,
                                                   TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
                                                   BigInteger initialSupply) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initialSupply)));
        return deployRemoteCall(TokenContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
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

    public static class ApprovalEventResponse extends BaseEventResponse {
        public String owner;

        public String spender;

        public BigInteger value;
    }

    public static class TransferEventResponse extends BaseEventResponse {
        public String from;

        public String to;

        public BigInteger value;
    }
}
