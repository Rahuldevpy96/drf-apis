from django.urls import path

from user.views import AdminLoginView

from rest_framework_simplejwt.views import TokenBlacklistView

class CustomTokenBlacklistView(TokenBlacklistView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Add your custom success response here if you want
        response.data['detail'] = 'Logout successful.'
        return response


urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='login'),
    path('logout/', CustomTokenBlacklistView.as_view(), name='token_blacklist'),
]

