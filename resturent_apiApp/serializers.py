from rest_framework import serializers
from .models import Returent, Item, Reviews


class ReviewSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = (
            'id',
            "ratting",
            "body"
        )

# Food Item serilizer
class ItemSerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(source='category', read_only=True)
    reviews = ReviewSerilizer(many=True)

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
            "get_avg_rating",
            "reviews"
        )


# Resturent serilizer
class ResturentSerializer(serializers.ModelSerializer):
    # Food Section
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
            "get_avg_ratings"
        )
        model = Returent
