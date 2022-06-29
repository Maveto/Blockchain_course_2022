//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ERC20 {

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    constructor(string memory name, string memory symbol){
        _name = name;
        _symbol = symbol;
    }

    function name() external view returns(string memory){
        return _name;
    }

    function symbol() external view returns(string memory){
        return _symbol;
    }

    function decimals() external view returns(uint256){
        return 18;
    }
}