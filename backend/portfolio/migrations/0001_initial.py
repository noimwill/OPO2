# Generated by Django 5.1.7 on 2025-03-12 02:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WalletAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=42, unique=True)),
                ('nickname', models.CharField(blank=True, max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='TokenBalance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token_address', models.CharField(max_length=42)),
                ('token_symbol', models.CharField(max_length=10)),
                ('token_name', models.CharField(max_length=100)),
                ('balance', models.DecimalField(decimal_places=18, max_digits=30)),
                ('value_usd', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('wallet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='balances', to='portfolio.walletaddress')),
            ],
            options={
                'unique_together': {('wallet', 'token_address')},
            },
        ),
    ]
