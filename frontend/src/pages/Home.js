// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, Divider } from '@chakra-ui/react';
import WalletConnect from '../components/WalletConnect';
import PortfolioTable from '../components/PortfolioTable';
import { fetchWalletBalances } from '../services/apiService';

const Home = () => {
  const [wallet, setWallet] = useState(null);
  const [balances, setBalances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (wallet?.address) {
      loadBalances(wallet.address);
    }
  }, [wallet]);

  const loadBalances = async (address) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWalletBalances(address);
      setBalances(data.balances);
    } catch (err) {
      setError(err.message || 'Failed to load balance data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = (walletData) => {
    setWallet(walletData);
  };

  return (
    <Container maxW="container.lg" py={10}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="2xl">OPO2 Crypto Portfolio</Heading>
        <Text mt={2} fontSize="lg">View all your cryptocurrency holdings in one place</Text>
      </Box>
      
      <Divider my={6} />
      
      {!wallet ? (
        <WalletConnect onConnect={handleConnect} />
      ) : (
        <Box>
          <Box bg="blue.50" p={4} borderRadius="md" mb={6}>
            <Text>
              <strong>Connected Wallet:</strong> {wallet.address}
            </Text>
          </Box>
          <PortfolioTable 
            balances={balances} 
            isLoading={isLoading} 
            error={error} 
          />
        </Box>
      )}
    </Container>
  );
};

export default Home;