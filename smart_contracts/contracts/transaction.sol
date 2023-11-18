// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// @title A Transaction script to the blockchain
//@author Dozie
//@dev All function calls are currently implemented without side effects
contract Transactions {
    uint256 transactionCount;

    event Transfer (address _from, address _to, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address _from;
        address _to;
        uint _amount;
        string _message;
        uint256 _timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    // Checks if address is correct
    modifier fromAccount(address _from) {
        require(msg.sender == _from);
        _;
    }
    function addToBlockChain(address payable _from, address payable _to, uint _amount, string memory _message, string memory keyword) fromAccount(_from) public {
        transactionCount += 1;
        transactions.push(TransferStruct(_from, _to, _amount, _message, block.timestamp, keyword));

        emit Transfer(_from, _to, _amount, _message, block.timestamp, keyword);
    }
    // Transaction getter function
    // @dev Return Transaction
    function getAllTransactions() public view returns(TransferStruct[] memory) {
        return transactions;

    }

    // @dev return transaction count
    function getTransactionCount() public view returns(uint256) {
        return transactionCount;
    }
}
