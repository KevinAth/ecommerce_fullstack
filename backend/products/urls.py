from django.urls import path
from rest_framework import routers

from .views import getProducts,getCategories,getproduct,getrating,filterProduct,filterPrice,getImages

##router = routers.DefaultRouter()
##router.register(r'products',getproducts,'products')

urlpatterns = [
  path('products/',getProducts, name='products'),
  path('getimages/<int:id>/',getImages, name='imgs_product'),
  path('categories/',getCategories, name='categories'),
  path('product/<int:id>/',getproduct, name='product'), 
  path('getrating/<int:id>/',getrating, name='getrating'),
  path('filterproduct/<str:category>/',filterProduct, name='filtered'),
  path('filterproduct/',filterPrice, name='filteredByprice'),
]
