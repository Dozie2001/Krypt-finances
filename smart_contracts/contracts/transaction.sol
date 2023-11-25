// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// @title A Transaction script to the blockchain
//@author Dozie
//@dev All function calls are currently implemented without side effects
contract Transactions {
    uint256 transactionCount;

    event Transfer (address from, address _to, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address from;
        address _to;
        uint _amount;
        string _message;
        uint256 _timestamp;
        string keyword;
    }

    TransferStruct[] transactions;


    function addToBlockChain(address payable _to, uint _amount, string memory _message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, _to, _amount, _message, block.timestamp, keyword));

        emit Transfer(msg.sender, _to, _amount, _message, block.timestamp, keyword);
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
