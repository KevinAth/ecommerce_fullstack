from django.urls import path

from .views import getProducts,getCategories,getproduct,getrating,filterProduct,filterPrice,getImages,SearchProducts,createReview,getProductsPage

##router = routers.DefaultRouter()
##router.register(r'products',getproducts,'products')

urlpatterns = [
  path('products/',getProducts, name='products'),
  path('productspage/',getProductsPage, name='productspage'), 
  path('getimages/<int:id>/',getImages, name='imgs_product'),
  path('categories/',getCategories, name='categories'),
  path('product/<int:id>/',getproduct, name='product'), 
  path('getrating/<int:id>/',getrating, name='getrating'),
  path('filterproduct/<str:category>/',filterProduct, name='filtered'),
  path('filterproduct/',filterPrice, name='filteredByprice'),
  path('search/<str:search>/',SearchProducts),
  path('createreview/',createReview,name='createreview')
]
