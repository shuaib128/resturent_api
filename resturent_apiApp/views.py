from users.models import Profile
from .models import Returent, Item, Catrgory
from .serializers import ResturentSerializer, ItemSerializer
from rest_framework import serializers, viewsets
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class SnippetFilter(filters.FilterSet):
    class Meta:
        model = Returent
        fields = {
            'foodItems__category__title': ['icontains'],
        }

# Create your views here.
class ResturentViewSet(viewsets.ModelViewSet):
    queryset = Returent.objects.all()
    # queryset = Returent.objects.filter(foodItems__category__title='Salads')
    serializer_class = ResturentSerializer
    filterset_class = SnippetFilter


#Create New Resturent
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


#Create New Food Item and add them
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