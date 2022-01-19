from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Returent, Item


class ItemSerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(source='category', read_only=True)

    class Meta:
        model = Item
        fields = (
            'id',
            'title',
            'body',
            'image',
            'categoryName',
            'price',
            'item_structor',
            "devivery",
            "pickup",
            "dine_in",
        )


class ResturentSerializer(serializers.ModelSerializer):
    foodItems = ItemSerializer(many=True)

    class Meta:
        fields = (
            'id',
            'title',
            'body',
            'image',
            'distance',
            'foodItems',
            'delevary_fee',
            'store_location',
            'store_longitude',
            'store_latitude',
        )
        model = Returent
