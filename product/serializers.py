from rest_framework import serializers
from product.models import User, Product, SelectedProduct



# Serializer for the Product model
class ProductSerializer(serializers.ModelSerializer):
    selected_by_user = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_selected_by_user(self, obj):
        # Get the user ID from the context
        user_id = self.context.get('user_id', None)

        if user_id:
            # Check if the product is selected by the user
            selected_product_exists = SelectedProduct.objects.filter(user_id=user_id, product=obj).exists()
            return selected_product_exists

        return False


# Serializer for the Product model
class SelectedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelectedProduct
        fields = '__all__'
        depth = 1
