from django.urls import path
from product.views import ProductListAPIView,SelectProductView,ProductListFilterAPIView


urlpatterns = [
    path('', ProductListAPIView.as_view(), name='product'),
    path('filter/', ProductListFilterAPIView.as_view(), name='filter'),    
    path('selection/', SelectProductView.as_view(), name='selection'),
]

