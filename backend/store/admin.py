from django.contrib import admin
from backend.store.models import Order, OrderItem

admin.site.register(Order)
admin.site.register(OrderItem)
