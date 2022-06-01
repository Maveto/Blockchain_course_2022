//Contract Address Goerli: 0x338166683196f1600Bab23b66B325ff8C60B99ab

//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Universidad {

    uint private lastId;

    struct Review {
        uint id;
        string name;
        uint score;
        bool finalized;
        uint typeTest;
    }

    event congratulations(string name, string message);

    address private teacher;
    bool private closed;
    mapping(uint => Review) public reviewList;

    constructor() {
        teacher = msg.sender;
    }

    function addReview(string memory name) public teacherOnly(msg.sender) isClosed() {
        require(bytes(name).length >= 5, "The name must be larger than 5 characters!");
        reviewList[lastId] = Review(lastId, name, 0, false, 0);
        lastId++;
    }

    function finalizeReview(uint id, uint newScore) public teacherOnly(msg.sender) isClosed(){
        require(!reviewList[id].finalized, "This review has already finalized!");
        reviewList[id].finalized = true;

        if(reviewList[id].typeTest == 0){
            reviewList[id].typeTest = 1;
        }

        if(newScore > 90){
            reviewList[id].score = 100;
            emit congratulations(reviewList[id].name, "Congratulations!! you've got prefect score :)");
        } else {
            reviewList[id].score = newScore;
        }

    }

    function closeAll(bool newValue) public teacherOnly(msg.sender){
        closed = newValue;
    }

    function getBalance() public view teacherOnly(msg.sender) isClosed() returns(uint){
        return address(this).balance;
    }

    function request2T(uint id) public payable isClosed() {
        require(reviewList[id].finalized && reviewList[id].typeTest == 1, "Your review hasn't finalized yet or you already requested a 2T!");
        require(msg.value >= convertEtherToWei(10), "Not enough money!!");
        reviewList[id].finalized = false;
        reviewList[id].typeTest = 2;
        reviewList[id].score = 0;

        if(msg.value > convertEtherToWei(10)){
            payable(msg.sender).transfer(msg.value - convertEtherToWei(10));
        }
    }

    modifier teacherOnly(address client){
        require(client == teacher, "Only the teacher can do this!");
        _;
    }

    modifier isClosed() {
        require(!closed, "The reviews are closed!");
        _;
    }

    function convertEtherToWei(uint amountInEther) private pure returns(uint) {
        return amountInEther * 1 ether;
    }
    
}