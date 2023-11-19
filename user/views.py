from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

class AdminLoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or email == '' or password is None or password == '':
            return Response({'message': 'Invalid Creds', 'response_code': 400}, status=status.HTTP_400_BAD_REQUEST)

      
        user = User.objects.filter(email=email).first()

        if not user:
            return Response({'message': "Your email is not correct", 'response_code': 400}, status=status.HTTP_400_BAD_REQUEST)

        check = user.check_password(password)

        if not check:
            return Response({'message': "Your password is not correct", 'response_code': 201}, status=status.HTTP_400_BAD_REQUEST)

        if user and check:
           
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            context = {
                'access_token': str(access_token),
                'refresh_token': str(refresh),
                'user_id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }

            return Response({'data': context, 'message': 'Login successful', 'response_code': 200}, status=status.HTTP_200_OK)

