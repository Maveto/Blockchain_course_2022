//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract StructTest {

    struct Book {
        string title;
        string author;
        uint id;
        bool aviable;
    }

    Book public book1;

    function getTitle() public view returns(string memory) {
        return book1.title;
    }

    function setTitle(string memory newTitle) public {
        book1.title = newTitle;
    }
}