from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import re
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer


def password_check(password):
    """
    Verify the strength of 'password'
    Returns a dict indicating the wrong criteria
    A password is considered strong if:
        8 characters length or more
        1 digit or more
        1 symbol or more
        1 uppercase letter or more
        1 lowercase letter or more
    """

    # calculating the length
    length_error = len(password) < 8

    # searching for digits
    digit_error = re.search(r"\d", password) is None

    # searching for uppercase
    uppercase_error = re.search(r"[A-Z]", password) is None

    # searching for lowercase
    lowercase_error = re.search(r"[a-z]", password) is None

    # searching for symbols
    symbol_error = re.search(r"[ !#$%&'()*+,-./[\\\]^_`{|}~"+r'"]', password) is None

    # overall result
    password_ok = not ( length_error or digit_error or uppercase_error or lowercase_error or symbol_error )

    return {
        'password_ok' : password_ok,
        'length_error' : length_error,
        'digit_error' : digit_error,
        'uppercase_error' : uppercase_error,
        'lowercase_error' : lowercase_error,
        'symbol_error' : symbol_error,
    }

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#Register view hwre
class RegisterView(APIView):
    def post(self, request):
        PassWord = request.data['password']

        try:
            if password_check(PassWord)["password_ok"]:
                user = User.objects.create(
                    email=request.data['email'],
                    username=request.data['username'],
                    password = make_password(PassWord)
                )
                return Response("sucess")
            elif password_check(PassWord)["length_error"]:
                return Response("length_error")
            elif password_check(PassWord)["digit_error"]:
                return Response("digit_error")
            elif password_check(PassWord)["uppercase_error"]:
                return Response("uppercase_error")
            elif password_check(PassWord)["lowercase_error"]:
                return Response("lowercase_error")
            elif password_check(PassWord)["symbol_error"]:
                return Response("symbol_error")
            else:
                return Response("not strong enough password")
        except Exception as e:
            return Response(str(e))


#Profile view hwre
class UserView(APIView):
    def post(self, request):

        user = User.objects.filter(id=request.data["id"]).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


#Profile view hwre
class ProfileView(APIView):
    def post(self, request):

        profile = Profile.objects.filter(user=request.data["id"]).first()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


#Business Account create
class CreateBusinessAccountView(APIView):
    def post(self, request):

        profile = Profile.objects.get(user=request.data["id"])
        profile.business_account = True
        profile.save()
        return Response("sucess")

    
#Rider Account create
class CreateRiderAccountView(APIView):
    def post(self, request):

        profile = Profile.objects.get(user=request.data["id"])
        profile.rider_account = True
        profile.save()
        return Response("sucess")


#Check if rider or delever
class CheckBusinessOrDelever(APIView):
    def post(self, request):

        if request.data["check"] == "business":
            profile = Profile.objects.get(id=request.data["ID"])
            if(profile.business_account):
                return Response("has_account")
            else:
                 return Response("no_account_found")

        if request.data["check"] == "rider":
            profile = Profile.objects.get(id=request.data["ID"])
            if(profile.business_account):
                 return Response("has_account")
            else:
                 return Response("no_account_found")