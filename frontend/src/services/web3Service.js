// frontend/src/services/web3Service.js
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

export const connectWallet = async () => {
  try {
    const provider = await detectEthereumProvider();
    
    if (!provider) {
      throw new Error('Please install MetaMask!');
    }
    
    // Request account access
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }
    
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const network = await ethersProvider.getNetwork();
    
    return {
      address: accounts[0],
      chainId: network.chainId,
      provider: ethersProvider
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export const getBalance = async (address, provider) => {
  try {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};