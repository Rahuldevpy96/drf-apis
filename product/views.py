from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .serializers import ProductSerializer, SelectedProductSerializer
from .models import Product, SelectedProduct

# # Create your views here.
class ProductListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Get parameters from the request
        search_query = request.query_params.get('search', '')

        # Get the user ID from the decoded JWT token
        user_id = request.user.id

        # Create the base queryset
        queryset = Product.objects.all()

        # Apply search
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)

        # Check if the queryset is empty
        if not queryset.exists():
            return Response({'message': 'No products available based on the specified filters', 'response_code': 400},
                            status=status.HTTP_404_NOT_FOUND)

        # Serialize the queryset
        serializer = ProductSerializer(queryset, many=True, context={'user_id': user_id})

        # Return the serialized data
        return Response({'data': serializer.data, 'message': 'Request successful', 'response_code': 200},
                        status=status.HTTP_200_OK)
    
    
class ProductListFilterAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Get parameters from the request
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')

        # Validate that both min_price and max_price are provided
        if not min_price or not max_price:
            return Response({'message': 'Both min_price and max_price are required','response_code':400},
                            status=status.HTTP_400_BAD_REQUEST)

        # Create the base queryset
        queryset = Product.objects.all()

        # Apply price filter
        queryset = queryset.filter(price__gte=min_price, price__lte=max_price)

        # Check if the queryset is empty
        if not queryset.exists():
            return Response({'message': 'No products available based on the specified filters','response_code':400},
                            status=status.HTTP_404_NOT_FOUND)

        # Serialize the queryset
        serializer = ProductSerializer(queryset, many=True)

        return Response({'data': serializer.data, 'message': 'Request successful', 'response_code': 200},
                        status=status.HTTP_200_OK)
    
class SelectProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        product_ids = request.data.get('product_ids', [])

        # Check if product_ids is provided
        if not product_ids:
            return Response({'message': 'product_ids are required','response_code':400}, status=status.HTTP_400_BAD_REQUEST)

        selected_products = []

        for product_id in product_ids:
            try:
                product = Product.objects.get(pk=product_id)

                # Check if the user has already selected this product
                if SelectedProduct.objects.filter(user=user, product=product).exists():
                    return Response({'message': f'Product ID {product_id} already selected by the user','response_code':400},
                                    status=status.HTTP_400_BAD_REQUEST)

                selected_product = SelectedProduct.objects.create(user=user, product=product)
                selected_products.append(selected_product)
            except Product.DoesNotExist:
                return Response({'message': f'Invalid Product ID: {product_id}','response_code':400}, status=status.HTTP_400_BAD_REQUEST)

        # Use the serializer class for SelectedProduct
        serializer = SelectedProductSerializer(selected_products, many=True)

        return Response({'data': serializer.data, 'message': 'Request successful', 'response_code': 200},
                        status=status.HTTP_200_OK)
