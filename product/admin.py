from django.contrib import admin
from .models import Product, SelectedProduct


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'is_available', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('is_available', 'created_at', 'updated_at')

@admin.register(SelectedProduct)
class SelectedProductAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'selected_at')
    search_fields = ('user__username', 'product__name')
    list_filter = ('selected_at',)
