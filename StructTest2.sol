//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract StructTest2 {

    struct Book {
        string title;
        string author;
        uint id;
        bool aviable;
    }

    Book public book1;
    Book public book2 = Book("My Title", "Mauricio Vejarano", 2, true);

    function getTitle() public view returns(string memory) {
        return book1.title;
    }

    function setTitle(string memory newTitle) public {
        book1.title = newTitle;
    }

    function getTitleAndIdBook2() public view returns(string memory, uint) {
        return (book2.title, book2.id);
    }
}