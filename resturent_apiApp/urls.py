from django.urls import path
from django.urls.conf import include, include
from .views import (
    ResturentsViewSet, ResturentCreateView, ItemCreateView,
    ResturentViewSet, ResturentsSearchViewSet, AddItemStructorView
)


urlpatterns = [
    path('', ResturentsViewSet.as_view()),
    path('<int:pk>/', ResturentViewSet.as_view()),
    path('resturent/search/', ResturentsSearchViewSet.as_view()),
    path('add/itemstr/', AddItemStructorView.as_view()),
    path('add/resturent/', ResturentCreateView.as_view()),
    path('add/item/', ItemCreateView.as_view()),
]