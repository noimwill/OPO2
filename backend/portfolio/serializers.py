# backend/portfolio/serializers.py
from rest_framework import serializers
from .models import WalletAddress, TokenBalance

class TokenBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenBalance
        fields = ['token_address', 'token_symbol', 'token_name', 'balance', 'value_usd', 'last_updated']

class WalletAddressSerializer(serializers.ModelSerializer):
    balances = TokenBalanceSerializer(many=True, read_only=True)
    
    class Meta:
        model = WalletAddress
        fields = ['id', 'address', 'nickname', 'created_at', 'balances']