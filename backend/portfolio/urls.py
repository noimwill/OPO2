# backend/portfolio/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'wallets', views.WalletViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('fetch-balances/', views.fetch_wallet_balances, name='fetch-balances'),
]