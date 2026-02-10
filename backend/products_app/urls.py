from django.urls import path
from products_app import views

urlpatterns = (
    path('', views.List_and_Add_Products.as_view(), name='List_and_Add_Products'),
    path('<str:pk>/', views.View_Update_Delete_Product.as_view(), name='View_Update_Delete_Product'),
)
