# backend/portfolio/models.py
from django.db import models

class WalletAddress(models.Model):
    address = models.CharField(max_length=42, unique=True)
    nickname = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nickname or self.address

class TokenBalance(models.Model):
    wallet = models.ForeignKey(WalletAddress, on_delete=models.CASCADE, related_name='balances')
    token_address = models.CharField(max_length=42)
    token_symbol = models.CharField(max_length=10)
    token_name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=30, decimal_places=18)
    value_usd = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('wallet', 'token_address')
    
    def __str__(self):
        return f"{self.wallet.address} - {self.token_symbol}: {self.balance}"
