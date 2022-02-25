from django.urls import path
from .views import (
    ResturentsViewSet, ResturentCreateView, ItemCreateView,
    ResturentViewSet, ResturentsSearchViewSet, AddItemStructorView,
    DelivaryTypeView, MakeReviewView
)


urlpatterns = [
    path('', ResturentsViewSet.as_view()),
    path('<int:pk>/', ResturentViewSet.as_view()),
    path('resturent/search/', ResturentsSearchViewSet.as_view()),
    path('resturent/search/delivery/', DelivaryTypeView.as_view()),
    path('add/itemstr/', AddItemStructorView.as_view()),
    path('add/resturent/', ResturentCreateView.as_view()),
    path('add/item/', ItemCreateView.as_view()),
    path('add/review/', MakeReviewView.as_view()),
]