from django.urls import path
from django.urls.conf import include, include
from .views import ResturentViewSet
from rest_framework.routers import DefaultRouter
from .views import (
    ResturentCreateView, ItemCreateView
)

router2 = DefaultRouter()
router2.register('', ResturentViewSet, basename='')

urlpatterns = [
    path('', include(router2.urls)),
    path('add/resturent/', ResturentCreateView.as_view()),
    path('add/item/', ItemCreateView.as_view()),
]