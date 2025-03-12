# backend/portfolio/views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import WalletAddress, TokenBalance
from .serializers import WalletAddressSerializer, TokenBalanceSerializer
from web3 import Web3
import json
import os

# Connect to Ethereum node - using Infura as an example
INFURA_URL = 'https://mainnet.infura.io/v3/f4c52ed8e143438fb233ab614c3717ff'
w3 = Web3(Web3.HTTPProvider(INFURA_URL))

class WalletViewSet(viewsets.ModelViewSet):
    queryset = WalletAddress.objects.all()
    serializer_class = WalletAddressSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def fetch_wallet_balances(request):
    """Fetch token balances for a given wallet address"""
    address = request.data.get('address')
    
    if not address or not w3.is_address(address):
        return Response({"error": "Invalid Ethereum address"}, status=400)
    
    # Convert to checksum address - ADD THIS LINE
    checksum_address = w3.to_checksum_address(address)
    
    # Check if address exists, if not create it
    wallet, created = WalletAddress.objects.get_or_create(address=checksum_address)
    
    # Simplified example response - USE checksum_address BELOW
    sample_balances = [
        {
            "token_address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "token_symbol": "ETH",
            "token_name": "Ethereum",
            "balance": w3.eth.get_balance(checksum_address) / 10**18,
            "value_usd": 0.0  # Would be calculated based on current price
        },
    ]
    
    return Response({"address": checksum_address, "balances": sample_balances})