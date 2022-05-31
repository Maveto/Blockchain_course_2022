//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EventTest {

    address private owner;
    mapping(address => uint) public tokenBalance;

    event tokensSent(address from, address to, uint amount);

    constructor() {
        owner = msg.sender;
        tokenBalance[msg.sender] = 100;
    }

    function sendToken(address to, uint amount) public returns(bool){
        require(msg.sender == owner, 'you are not the owner');
        tokenBalance[msg.sender] -= amount;
        tokenBalance[to] += amount;

        emit tokensSent(msg.sender, to, amount);

        return true;
    }
}