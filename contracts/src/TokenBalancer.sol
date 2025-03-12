// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract TokenBalancer {
    function getEthBalance(address wallet) public view returns (uint256) {
        return wallet.balance;
    }
    
    function getTokenBalance(address token, address wallet) public view returns (uint256) {
        return IERC20(token).balanceOf(wallet);
    }
    
    function getMultipleTokenBalances(
        address[] calldata tokens,
        address wallet
    ) public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](tokens.length);
        
        for (uint256 i = 0; i < tokens.length; i++) {
            balances[i] = IERC20(tokens[i]).balanceOf(wallet);
        }
        
        return balances;
    }
}