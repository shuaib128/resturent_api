from users.models import Profile
from .models import Returent, Item, Catrgory
from .serializers import ResturentSerializer, ItemSerializer
from rest_framework import serializers, viewsets
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import (
    SAFE_METHODS, 
    BasePermission,
)
from rest_framework import generics


#Custom permissions
class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.auhtor == request.user



# Create your views here.
class ResturentsViewSet(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def get(self, request, format=None):
        restorents = Returent.objects.all()

        serilizer = ResturentSerializer(restorents, many=True)
        return Response(serilizer.data)



#############Single resturent############
class ResturentViewSet(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [PostUserWritePermission]
    queryset = Returent.objects.all()
    serializer_class = ResturentSerializer


#############Search View################
class ResturentsSearchViewSet(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def post(self, request, format=None):
        search_query = request.data["search_query"]["q"]
        restorent = Returent.objects.filter(foodItems__category__title=search_query)

        if len(list(restorent)) != 0:
            serilizer = ResturentSerializer(restorent, many=True)
            return Response(serilizer.data)
        else:
            return Response("No Resturent")



###################Create New Resturent#################
class ResturentCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def post(self, request, format=None):
        profile = get_object_or_404(Profile, user=request.data["userID"])
        
        #Create new restorunt
        resturent = Returent()
        resturent.title = request.data["Name"]
        resturent.body = request.data["Description"]
        resturent.distance = request.data["Distance"]
        resturent.delevary_fee = request.data["DelevaryFee"]
        resturent.store_location = request.data["Location"]
        resturent.store_longitude = request.data["Longitude"]
        resturent.store_latitude = request.data["Langitude"]

        try:
            resturent.image = request.data["coverimage"]
        except:
            pass
        resturent.save()

        created_restorent = get_object_or_404(Returent, title=request.data["Name"])
        profile.returent.add(created_restorent)

        serilizer = ResturentSerializer(created_restorent)

        return Response(serilizer.data)



###########Create New Food Item and add them##############
class ItemCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def post(self, request, format=None):
        #make category instance
        category = Catrgory()
        category.title = request.data["Catogory"]
        category.save()

        #Make item instance
        item = Item()
        item.title = request.data["Name"]
        item.body = request.data["Description"]
        item.category = get_object_or_404(Catrgory, title=request.data["Catogory"])
        item.price = request.data["Distance"]
        try:
            item.image = request.data["coverimage"]
        except:
            pass
        item.save()

        #Add item to resturent
        resturent = get_object_or_404(Returent, id=request.data["resturent_id"])
        created_item = get_object_or_404(Item, title=request.data["Name"])
        resturent.foodItems.add(
            created_item
        )

        serilizer = ItemSerializer(created_item)
        return Response(serilizer.data)