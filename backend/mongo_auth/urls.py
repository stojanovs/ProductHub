from django.urls import path
from mongo_auth import views

'''
@route "/api/"
@description Auth Urls
'''
urlpatterns = (
    path('register/', views.Register.as_view(), name='Register'),
    path('login/', views.Login.as_view(), name='Login'),
    path('profile/', views.UserProfile.as_view(), name='UserProfile'),
)
