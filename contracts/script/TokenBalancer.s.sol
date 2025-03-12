// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/TokenBalancer.sol";

contract DeployTokenBalancer is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        TokenBalancer tokenBalancer = new TokenBalancer();
        
        vm.stopBroadcast();
    }
}
