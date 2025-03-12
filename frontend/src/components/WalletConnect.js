// frontend/src/components/WalletConnect.js
import React, { useState } from 'react';
import { Button, Box, Text, useToast } from '@chakra-ui/react';
import { connectWallet } from '../services/web3Service';

const WalletConnect = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const toast = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const walletData = await connectWallet();
      onConnect(walletData);
      toast({
        title: 'Wallet connected',
        description: `Connected to ${walletData.address.substring(0, 6)}...${walletData.address.substring(38)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Connection error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Box textAlign="center" py={10}>
      <Text fontSize="xl" mb={5}>Connect your wallet to view your cryptocurrency holdings</Text>
      <Button 
        colorScheme="teal" 
        size="lg" 
        onClick={handleConnect} 
        isLoading={isConnecting}
        loadingText="Connecting"
      >
        Connect MetaMask
      </Button>
    </Box>
  );
};

export default WalletConnect;
