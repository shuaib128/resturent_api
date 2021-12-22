from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from resturent_apiApp.models import Returent, Item


# Profile Serilizer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
        ]



class ItemSerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(source='category', read_only=True)

    class Meta:
        model = Item
        fields = ('id', 'title', 'body', 'image', 'categoryName', 'price')


# Resturent serilizer
class ResturentsSerilizer(serializers.ModelSerializer):
    foodItems = ItemSerializer(many=True)
    class Meta:
        model = Returent
        fields = (
            'id',
            'title',
            'body',
            'image',
            'distance',
            'delevary_fee',
            'store_location',
            'store_longitude',
            'store_latitude',
            'foodItems',
        )


# Profile Serilizer
class ProfileSerializer(serializers.ModelSerializer):
    returent = ResturentsSerilizer(many=True)

    class Meta:
        model = Profile
        fields = [
            'id',
            'user',
            'image',
            'address',
            'joined_date',
            'Followes',
            'business_account',
            'rider_account',
            'returent'
        ]
