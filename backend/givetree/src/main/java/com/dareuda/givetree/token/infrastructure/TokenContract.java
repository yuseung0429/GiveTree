package com.dareuda.givetree.token.infrastructure;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
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
    public static final String BINARY = "0x608060405234801561001057600080fd5b506040518060400160405280600a81526020017f4c45414620546f6b656e000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f4c45414600000000000000000000000000000000000000000000000000000000815250816003908161008c919061066d565b50806004908161009c919061066d565b50505033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160066000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061016b33600061017060201b60201c565b61085f565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036101e25760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016101d99190610780565b60405180910390fd5b6101f4600083836101f860201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361024a57806002600082825461023e91906107ca565b9250508190555061031d565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156102d6578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016102cd9392919061080d565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361036657806002600082825403925050819055506103b3565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516104109190610844565b60405180910390a3505050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061049e57607f821691505b6020821081036104b1576104b0610457565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026105197fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826104dc565b61052386836104dc565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061056a6105656105608461053b565b610545565b61053b565b9050919050565b6000819050919050565b6105848361054f565b61059861059082610571565b8484546104e9565b825550505050565b600090565b6105ad6105a0565b6105b881848461057b565b505050565b5b818110156105dc576105d16000826105a5565b6001810190506105be565b5050565b601f821115610621576105f2816104b7565b6105fb846104cc565b8101602085101561060a578190505b61061e610616856104cc565b8301826105bd565b50505b505050565b600082821c905092915050565b600061064460001984600802610626565b1980831691505092915050565b600061065d8383610633565b9150826002028217905092915050565b6106768261041d565b67ffffffffffffffff81111561068f5761068e610428565b5b6106998254610486565b6106a48282856105e0565b600060209050601f8311600181146106d757600084156106c5578287015190505b6106cf8582610651565b865550610737565b601f1984166106e5866104b7565b60005b8281101561070d578489015182556001820191506020850194506020810190506106e8565b8683101561072a5784890151610726601f891682610633565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061076a8261073f565b9050919050565b61077a8161075f565b82525050565b60006020820190506107956000830184610771565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006107d58261053b565b91506107e08361053b565b92508282019050808211156107f8576107f761079b565b5b92915050565b6108078161053b565b82525050565b60006060820190506108226000830186610771565b61082f60208301856107fe565b61083c60408301846107fe565b949350505050565b600060208201905061085960008301846107fe565b92915050565b6114008061086e6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806379c6506811610097578063d5a5268211610066578063d5a52682146102c1578063dd62ed3e146102dd578063f5537ede1461030d578063f851a4401461032957610100565b806379c650681461023b57806395d89b4114610257578063a9059cbb14610275578063d1df306c146102a557610100565b80631ffbb064116100d35780631ffbb0641461018d57806323b872dd146101bd578063313ce567146101ed57806370a082311461020b57610100565b806306fdde0314610105578063095ea7b31461012357806318160ddd146101535780631feb6f2414610171575b600080fd5b61010d610347565b60405161011a9190611054565b60405180910390f35b61013d6004803603810190610138919061110f565b6103d9565b60405161014a919061116a565b60405180910390f35b61015b6103fc565b6040516101689190611194565b60405180910390f35b61018b600480360381019061018691906111af565b610406565b005b6101a760048036038101906101a291906111af565b6104b7565b6040516101b4919061116a565b60405180910390f35b6101d760048036038101906101d291906111dc565b61050d565b6040516101e4919061116a565b60405180910390f35b6101f561053c565b604051610202919061124b565b60405180910390f35b610225600480360381019061022091906111af565b610541565b6040516102329190611194565b60405180910390f35b6102556004803603810190610250919061110f565b610589565b005b61025f6105ed565b60405161026c9190611054565b60405180910390f35b61028f600480360381019061028a919061110f565b61067f565b60405161029c919061116a565b60405180910390f35b6102bf60048036038101906102ba919061110f565b6106a2565b005b6102db60048036038101906102d691906111af565b610706565b005b6102f760048036038101906102f29190611266565b6107bb565b6040516103049190611194565b60405180910390f35b610327600480360381019061032291906111dc565b610842565b005b6103316108fc565b60405161033e91906112b5565b60405180910390f35b606060038054610356906112ff565b80601f0160208091040260200160405190810160405280929190818152602001828054610382906112ff565b80156103cf5780601f106103a4576101008083540402835291602001916103cf565b820191906000526020600020905b8154815290600101906020018083116103b257829003601f168201915b5050505050905090565b6000806103e4610922565b90506103f181858561092a565b600191505092915050565b6000600254905090565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661045c57600080fd5b6001600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b600080610518610922565b905061052585828561093c565b6105308585856109d0565b60019150509392505050565b600090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166105df57600080fd5b6105e98282610ac4565b5050565b6060600480546105fc906112ff565b80601f0160208091040260200160405190810160405280929190818152602001828054610628906112ff565b80156106755780601f1061064a57610100808354040283529160200191610675565b820191906000526020600020905b81548152906001019060200180831161065857829003601f168201915b5050505050905090565b60008061068a610922565b90506106978185856109d0565b600191505092915050565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166106f857600080fd5b6107028282610b46565b5050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461076057600080fd5b6001600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16806108e35750600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6108ec57600080fd5b6108f78383836109d0565b505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b6109378383836001610bc8565b505050565b600061094884846107bb565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146109ca57818110156109ba578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016109b193929190611330565b60405180910390fd5b6109c984848484036000610bc8565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a425760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610a3991906112b5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ab45760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610aab91906112b5565b60405180910390fd5b610abf838383610d9f565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b365760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610b2d91906112b5565b60405180910390fd5b610b4260008383610d9f565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610bb85760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610baf91906112b5565b60405180910390fd5b610bc482600083610d9f565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610c3a5760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610c3191906112b5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610cac5760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610ca391906112b5565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610d99578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610d909190611194565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610df1578060026000828254610de59190611396565b92505081905550610ec4565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610e7d578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610e7493929190611330565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610f0d5780600260008282540392505081905550610f5a565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610fb79190611194565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610ffe578082015181840152602081019050610fe3565b60008484015250505050565b6000601f19601f8301169050919050565b600061102682610fc4565b6110308185610fcf565b9350611040818560208601610fe0565b6110498161100a565b840191505092915050565b6000602082019050818103600083015261106e818461101b565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110a68261107b565b9050919050565b6110b68161109b565b81146110c157600080fd5b50565b6000813590506110d3816110ad565b92915050565b6000819050919050565b6110ec816110d9565b81146110f757600080fd5b50565b600081359050611109816110e3565b92915050565b6000806040838503121561112657611125611076565b5b6000611134858286016110c4565b9250506020611145858286016110fa565b9150509250929050565b60008115159050919050565b6111648161114f565b82525050565b600060208201905061117f600083018461115b565b92915050565b61118e816110d9565b82525050565b60006020820190506111a96000830184611185565b92915050565b6000602082840312156111c5576111c4611076565b5b60006111d3848285016110c4565b91505092915050565b6000806000606084860312156111f5576111f4611076565b5b6000611203868287016110c4565b9350506020611214868287016110c4565b9250506040611225868287016110fa565b9150509250925092565b600060ff82169050919050565b6112458161122f565b82525050565b6000602082019050611260600083018461123c565b92915050565b6000806040838503121561127d5761127c611076565b5b600061128b858286016110c4565b925050602061129c858286016110c4565b9150509250929050565b6112af8161109b565b82525050565b60006020820190506112ca60008301846112a6565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061131757607f821691505b60208210810361132a576113296112d0565b5b50919050565b600060608201905061134560008301866112a6565b6113526020830185611185565b61135f6040830184611185565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006113a1826110d9565b91506113ac836110d9565b92508282019050808211156113c4576113c3611367565b5b9291505056fea2646970667358221220a5cc8cd4240b088e9e60ab07c595024e40cbdfaf49be90d05f7db803c013bd4d64736f6c634300081b0033";

    private static String librariesLinkedBinary;

    public static final String FUNC_ADMIN = "admin";

    public static final String FUNC_ALLOWANCE = "allowance";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_BURNTOKEN = "burnToken";

    public static final String FUNC_DECIMALS = "decimals";

    public static final String FUNC_ISAGENT = "isAgent";

    public static final String FUNC_MINTTOKEN = "mintToken";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_REGISTERAGENTS = "registerAgents";

    public static final String FUNC_REGISTERTRANSFERTOKENALLOWEDCONTRACTS = "registerTransferTokenAllowedContracts";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_TRANSFER = "transfer";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final String FUNC_TRANSFERTOKEN = "transferToken";

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

    public RemoteFunctionCall<String> admin() {
        final Function function = new Function(FUNC_ADMIN,
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

    public RemoteFunctionCall<TransactionReceipt> burnToken(String from, BigInteger amount) {
        final Function function = new Function(
                FUNC_BURNTOKEN,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from),
                        new org.web3j.abi.datatypes.generated.Uint256(amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> decimals() {
        final Function function = new Function(FUNC_DECIMALS,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Boolean> isAgent(String account) {
        final Function function = new Function(FUNC_ISAGENT,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, account)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> mintToken(String from, BigInteger amount) {
        final Function function = new Function(
                FUNC_MINTTOKEN,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from),
                        new org.web3j.abi.datatypes.generated.Uint256(amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> name() {
        final Function function = new Function(FUNC_NAME,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> registerAgents(String agent) {
        final Function function = new Function(
                FUNC_REGISTERAGENTS,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, agent)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> registerTransferTokenAllowedContracts(
            String contractAddr) {
        final Function function = new Function(
                FUNC_REGISTERTRANSFERTOKENALLOWEDCONTRACTS,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, contractAddr)),
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

    public RemoteFunctionCall<TransactionReceipt> transferToken(String from, String to,
                                                                BigInteger amount) {
        final Function function = new Function(
                FUNC_TRANSFERTOKEN,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from),
                        new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(amount)),
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
                                                   ContractGasProvider contractGasProvider) {
        return deployRemoteCall(TokenContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), "");
    }

    public static RemoteCall<TokenContract> deploy(Web3j web3j,
                                                   TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(TokenContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<TokenContract> deploy(Web3j web3j, Credentials credentials,
                                                   BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(TokenContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<TokenContract> deploy(Web3j web3j,
                                                   TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(TokenContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), "");
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
