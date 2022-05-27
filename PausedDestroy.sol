//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract PausedDestroy{

    address private owner;
    bool public paused;

    constructor() {
        owner = msg.sender;
    }

    function depositMoney() public payable {}

    function setPaused(bool newValue) public {
        paused = newValue;
    }

    function withdrawAllMaoney(address payable to) public {
        require(owner == msg.sender && !paused, "You are not the owner or the contract is pused");
        to.transfer(address(this).balance);
    }

    function destroyContract(address payable to) public {
        require(owner == msg.sender && !paused, "You are not the owner or the contract is pused");
        selfdestruct(to);
    }
}