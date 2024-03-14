// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

import "./SafeMath.sol";

contract PepeLinq is ERC20 {
	using SafeMath for uint256;

	// Pepelinq token decimal
	uint8 public constant _decimals = 18;
	// Total supply for the Pepelinq token
	uint256 private _totalSupply = 10000000000 * (10 ** uint256(_decimals));
	// Token Pepelinq deployer
	address private _PPLQDeployer;
	// Whitelist mapping
	mapping(address => bool) private _PPLQWhitelist;

	constructor(address _deployer) ERC20("PepeLinq", "PPLQ") {
		require(_deployer != address(0), "PepeLinq: deploy from the zero address");
		_PPLQDeployer = _deployer;
		_mint(_PPLQDeployer, _totalSupply);
	}

	modifier onlyOwner {
		require(msg.sender == _PPLQDeployer, "FORBIDDEN");
		_;
	}

	function whitelist(address addr) external onlyOwner {
		require(addr != address(0), "PepeLinq: invalid address");
		_PPLQWhitelist[addr] = true;
	}

	function burn(uint256 amount) external returns (bool) {
		require(_PPLQWhitelist[msg.sender], "PepeLinq: sender not in whitelist");
		_burn(msg.sender, amount);
		return true;
	}

	function transfer(address to, uint256 value) public override returns (bool) {
		require(_PPLQWhitelist[msg.sender] || _PPLQWhitelist[to], "PepeLinq: sender or recipient not in whitelist");
		_transferPepeLinq(msg.sender, to, value);
		return true;
	}

	function _transferPepeLinq(address from, address to, uint256 value) internal {
		require(from != address(0), "PepeLinq: transfert from zero address");
		require(to != address(0), "PepeLinq: transfert to zero address");
		require(value > 0, "PepeLinq: transfert value must be greater than zero");

		uint256 burnValue = value.mul(1).div(100);
		uint256 transferValue = value.sub(burnValue);

		_burn(from, burnValue);
		_transfer(from, to, transferValue);
	}
}