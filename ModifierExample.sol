//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ModifierExample {

    bool public myBool;
    string public myString;
    uint public myNumber;
    mapping(uint => bool) public myMapping;

    mapping(address => uint) public myAddresses;

    function recieveMoney() public payable {
        myAddresses[msg.sender] += msg.value;
    }

    function withdrawMonet(uint amount) public {
        uint amountInETH = amount * (10 ** 18);
        require(amountInETH < myAddresses[msg.sender], "Not enough money!!");
        myAddresses[msg.sender] -= amountInETH;
        payable(msg.sender).transfer(amountInETH);

        // if(amountInETH < myAddresses[msg.sender]){
        //     myAddresses[msg.sender] -= amountInETH;
        //     payable(msg.sender).transfer(amountInETH);
        // }
    }

    function setValue(uint index, bool value) public {
        myMapping[index] = value;
    }

    function setMyAddresses(address walet, uint amount) public{
        myAddresses[walet] = amount;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}