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


    function totalSuppply() public view override returns(uint256){
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns(uint256){
        return _balances[account];
    }

    function transfer(address to, uint256 amount) public override returns(bool){
        address owner = msg.sender;
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(address owner, address spender) public view override returns(uint256){
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public override returns(uint256){
        address owner = msg.sender;
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public override returns(bool){
        address spender = msg.sender;
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
}