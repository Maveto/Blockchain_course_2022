//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract StructTest3 {

    struct Book {
        string title;
        string author;
        uint id;
        bool available;
        uint quantity;
    }

    Book public book1;
    Book public book2 = Book("My Title", "Mauricio Vejarano", 2, true, 10);

    mapping(uint => Book) public myLibrary;

    function borrowBook(uint bookId) public {
        myLibrary[bookId].quantity--;
    }

    function getBook(uint bookId) public view returns(bool) {
        return myLibrary[bookId].available;
    }

    function addBook(Book memory newBook) public {
        myLibrary[newBook.id] = newBook;
    }

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