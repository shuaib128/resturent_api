from django.urls import path
from .views import (RegisterView, MyTokenObtainPairView, ProfileView,
    UserView, CreateBusinessAccountView, CreateRiderAccountView,
    CheckBusinessOrDelever
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register', RegisterView.as_view()),
    path('profile', ProfileView.as_view()),
    path('user', UserView.as_view()),
    path('createbusinessaccount', CreateBusinessAccountView.as_view()),
    path('createrideraccount', CreateRiderAccountView.as_view()),
    path('checkbusiness', CheckBusinessOrDelever.as_view()),
]