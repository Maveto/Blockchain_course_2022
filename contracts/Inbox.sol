//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Inbox {

    string public message;
    address private ownerAddress;

    constructor(string memory initialMessage){
        ownerAddress = msg.sender;
        message = initialMessage;
    }

    function getMessage() public view onlyOwner(msg.sender) returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public onlyOwner(msg.sender) {

        //require(bytes(newMessage).length > 10, "the message has to be longer than 10 characters");
        //require(msg.sender == ownerAddress, "Only the owner can change this!");

        message = newMessage;
    }

    modifier onlyOwner(address client){
        require(client == ownerAddress, "Only the owner can change this!");
        _;
    }

}