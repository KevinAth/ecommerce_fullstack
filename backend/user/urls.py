from django.urls import path
from . import views

urlpatterns = [
    path('authuser/',views.AuthUser,name='authuser'),
    path('registeruser/',views.RegisterUser,name='registeruser'),
    path('getUserData/',views.GetUserData,name='getuserdata'),
    path('updateuser/<str:user>/',views.UpdateData, name='updateuser'),
    path('deleteaccount/<str:username>/',views.DeleteAccount,name='deleteaccount'),
    path('createaddress/<str:username>/',views.CreateAddress),
    path('getaddresses/<str:username>/',views.GetAddresses),
    path('deleteaddress/<int:id>/',views.DeleteAddress),
]
