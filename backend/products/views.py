from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import products,categories,Reviews,ImagesByProducts
from .serializer import productsSerializer,categoriesSerializer,reviewsSerializer,imagesSerializer
from rest_framework.response import Response

# Create views here.

@api_view(['GET'])
def getProducts(request):
    if request.method == 'GET':
        prods = products.objects.all()
        serializer = productsSerializer(prods, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def getImages(request,id):
    prods = products.objects.get(id=id)
    imgs = ImagesByProducts.objects.filter(product=prods)
    img_default = [img.img_1.url for img in imgs if img.img_1]
    
    return Response(img_default)

@api_view(['GET'])
def getCategories(request):
    if request.method == 'GET':
        cats = categories.objects.all()
        serializer = categoriesSerializer(cats, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def getproduct(request,id):
    if request.method == 'GET':
        try:
            prod = products.objects.get(id=id)
            reviews_product = prod.reviews.all()            
            reviews_serializer = reviewsSerializer(reviews_product, many=True)
            prod_serializer = productsSerializer(prod)
            
            promedio = 0
            if reviews_product:
                count = 0
                suma = 0
                for i in reviews_product:
                    count += 1
                    suma += i.rating
                promedio = suma//count
                   
        except  products.DoesNotExist:
            return print("El producto no existe.")
        return Response({
            'product':prod_serializer.data,
            'reviews':reviews_serializer.data,
            'review_prom':promedio
        })

@api_view(['GET'])
def getrating(request,id):
    if request.method == 'GET':
        prod = products.objects.get(id=id)
        reviews_product = prod.reviews.all()             
        promedio = 0
        if reviews_product:
            count = 0
            suma = 0
            for i in reviews_product:
                count += 1
                suma += i.rating
            promedio = suma//count
    return Response(promedio)

@api_view(['GET'])
def filterProduct(request,category):
    cat = categories.objects.get(categoria=category)
    ProductsByCategory = products.objects.filter(categoria=cat)
    prod_serializer = productsSerializer(ProductsByCategory,many=True)
    return Response(prod_serializer.data) 

@api_view(['GET'])
def filterPrice(request):
    min_price = request.GET.get('min')
    max_price = request.GET.get('max')
    category = request.GET.get('category')
    if category is not None and min_price is not None and max_price is not None:
        try:
            min_price = float(min_price)
            max_price = float(max_price)
            cat = categories.objects.get(categoria=category)
            ProductsByCategory = products.objects.filter(categoria=cat)
            prods = ProductsByCategory.filter(precio__gte=min_price, precio__lte=max_price)
            products_serializer = productsSerializer(prods, many=True)
            return Response(products_serializer.data)
        except ValueError:
            return Response({'error': 'Invalid price range'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    elif min_price is not None and max_price is not None:
        try:
            min_price = float(min_price)
            max_price = float(max_price)
            prods = products.objects.filter(precio__gte=min_price, precio__lte=max_price)
            products_serializer = productsSerializer(prods, many=True)
            return Response(products_serializer.data)
        except ValueError:
            return Response({'error': 'Invalid price range'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Missing min or max price'}, status=400)
        


        
        
        
        
        