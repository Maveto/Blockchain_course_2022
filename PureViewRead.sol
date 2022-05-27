//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract PureViewRead {

    bool public myBool;
    string public myString;
    uint public myNumber;
    mapping(uint => bool) public myMapping;

    mapping(address => uint) public myAddresses;

    function recieveMoney() public payable {
        myAddresses[msg.sender] += msg.value;
    }

    function withdrawMonet(uint amount) public {
        require(convertEtherToWei(amount) <= myAddresses[msg.sender], "Not enough money!!");
        myAddresses[msg.sender] -= convertEtherToWei(amount);
        payable(msg.sender).transfer(convertEtherToWei(amount));
    }

    function convertWeiToEther(uint amountInWei) public pure returns(uint) {
        return amountInWei / 1 ether;
    }

    function convertEtherToWei(uint amountInEther) public pure returns(uint) {
        return amountInEther * 1 ether;
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