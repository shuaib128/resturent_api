from users.models import Profile
from .models import Returent, Item, Catrgory
from .serializers import ResturentSerializer, ItemSerializer
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import (
    SAFE_METHODS, 
    BasePermission,
)
from rest_framework import generics
from django.core.paginator import Paginator
from django.http import JsonResponse


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
    def post(self, request, format=None):
        restorents = Returent.objects.filter(foodItems__devivery=True).distinct()

        paginator = Paginator(restorents, 12)
        page_number = request.data["pagenum"]

        if page_number:
            if int(page_number) <= paginator.num_pages:
                obj_list = paginator.get_page(page_number)
                serilizer = ResturentSerializer(obj_list, many=True)
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
        restorent = Returent.objects.filter(foodItems__category__title=search_query).distinct()

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
        #Helper function (detirmind if to return true or false)
        def true_or_false(data):
            if data == "false":
                return False
            else:
                return True

        #make category instance
        category = Catrgory()
        if Catrgory.objects.filter(title = request.data["Catogory"]).exists():
            print("duplicate")
            pass
        else:
            category.title = request.data["Catogory"]
        category.save()

        #Make item instance
        item = Item()
        item.title = request.data["Name"]
        item.body = request.data["Description"]
        item.category = get_object_or_404(Catrgory, title=request.data["Catogory"])
        item.price = request.data["Distance"]
        item.devivery = true_or_false(request.data["isDelivery"])
        item.pickup = true_or_false(request.data["isPickUp"])
        item.dine_in = true_or_false(request.data["isDinein"])
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


class AddItemStructorView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def post(self, request, format=None):
        foodItem = get_object_or_404(Item, id=request.data["item_id"])
        foodItem.item_structor = request.data["structor"]
        foodItem.save()

        return Response("serilizer.data")


#########Delevary type search###########
class DelivaryTypeView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def post(self, request, format=None):
        search_query = request.data["search_query"]["q"]
        print(search_query)

        if search_query == "pickup":
            restorent = Returent.objects.filter(foodItems__pickup=True).distinct()

            if len(list(restorent)) != 0:
                serilizer = ResturentSerializer(restorent, many=True)
                return Response(serilizer.data)
            else:
                return Response("No Resturent")

        
        if search_query == "dinein":
            restorent = Returent.objects.filter(foodItems__dine_in=True).distinct()

            if len(list(restorent)) != 0:
                serilizer = ResturentSerializer(restorent, many=True)
                return Response(serilizer.data)
            else:
                return Response("No Resturent")