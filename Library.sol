//Rinkeby Contract Address: 0xAEB9c1CAf1b6c05a5b13e7B15eE743327FFB0976

//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Library {

    struct Book {
        string title;
        string author;
        bool available;
        uint price;
    }

    address private owner;
    bool public paused;

    mapping(uint => Book) public bookStorage;
    uint private lastIndex;
    mapping(uint => address) public rentedBooks;

    constructor() {
        owner = msg.sender;
        lastIndex = 0;
    }

    //////////Owner functions///////////
    function addBook(Book memory newBook) public isPaused() {
        require(msg.sender == owner, "Only the owner can use this!");
        bookStorage[lastIndex] = newBook;
        lastIndex++;
    }

    function getTotalBalance() public view isPaused() returns(uint) {
        require(msg.sender == owner, "Only the owner can use this!");
        return address(this).balance;
    }

    function closeLibrary(bool newValue) public {
        require(msg.sender == owner, "Only the owner can use this!");
        paused = newValue;
    }

    //////////Client functions///////////
    function rentBook(uint bookId) public payable isPaused() {
        //Verificar que el libor esta disponible
        require(bookStorage[bookId].available, "The book is not available!");
        //Verficar dinero suficiente
        require(msg.value >= convertEtherToWei(bookStorage[bookId].price), "Not enough money!");
        //Alquilar el libro
        rentedBooks[bookId] = msg.sender;
        bookStorage[bookId].available = false;
        //devolver cambio
        payable(msg.sender).transfer(msg.value-convertEtherToWei(bookStorage[bookId].price));
    }

    function returnBook(uint bookId) public isPaused() {
        //Verificar que tiene el libro
        require(msg.sender == rentedBooks[bookId], "You do not have that book!");
        //Devolver el dinero
        payable(rentedBooks[bookId]).transfer(convertEtherToWei(bookStorage[bookId].price));
        //Recibir el libro
        rentedBooks[bookId] = address(0);
        bookStorage[bookId].available = true;
    }

    modifier isPaused() {
        require(!paused, "The contract is paused!");
        _;
    } 

    function convertEtherToWei(uint amountInEther) private pure returns(uint) {
        return amountInEther * 1 ether;
    }


}