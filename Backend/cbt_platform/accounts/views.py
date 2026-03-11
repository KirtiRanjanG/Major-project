from django.shortcuts import render
from .models import User
from rest_framework.generics import CreateAPIView
from .serializers import RegisterSerializer

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterView(CreateAPIView):
    

    serializer_class = RegisterSerializer



class LoginView(APIView):

    def post(self, request):

        user_id = request.data.get("user_id")
        password = request.data.get("password")

        user = authenticate(
            request,
            user_id=user_id,
            password=password
        )

        if user is None:
            return Response({"error": "Invalid credentials"})

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })




# Create your views here.
