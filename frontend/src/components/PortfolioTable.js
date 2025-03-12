// frontend/src/components/PortfolioTable.js
import React from 'react';
import { 
  Table, Thead, Tbody, Tr, Th, Td, 
  Box, Heading, Text, Spinner, 
  Tag, TagLabel
} from '@chakra-ui/react';

const PortfolioTable = ({ balances, isLoading, error }) => {
  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading portfolio data...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Error loading portfolio: {error}</Text>
      </Box>
    );
  }

  if (!balances || balances.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No tokens found in this wallet.</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto">
      <Heading size="md" mb={4}>Your Token Holdings</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Token</Th>
            <Th>Symbol</Th>
            <Th isNumeric>Balance</Th>
            <Th isNumeric>Value (USD)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {balances.map((token, index) => (
            <Tr key={index}>
              <Td>
                {token.token_name}
                <Text fontSize="xs" color="gray.500">{token.token_address}</Text>
              </Td>
              <Td>
                <Tag colorScheme="blue">
                  <TagLabel>{token.token_symbol}</TagLabel>
                </Tag>
              </Td>
              <Td isNumeric>{parseFloat(token.balance).toFixed(6)}</Td>
              <Td isNumeric>
                {token.value_usd 
                  ? `$${parseFloat(token.value_usd).toFixed(2)}` 
                  : 'N/A'}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PortfolioTable;