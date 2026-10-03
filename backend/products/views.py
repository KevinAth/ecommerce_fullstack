from rest_framework.decorators import api_view
from .models import products,categories,Reviews,ImagesByProducts
from .serializer import productsSerializer,categoriesSerializer,reviewsSerializer,imagesSerializer
from rest_framework.response import Response
from django.core.paginator import Paginator,PageNotAnInteger,EmptyPage

# Create views here.

@api_view(['GET'])
def getProducts(request):
    if request.method == 'GET':
        prods = products.objects.all()
        serializer = productsSerializer(prods, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def getProductsPage(request):
        prods = products.objects.all()
        paginator = Paginator(prods,10)
        page_number = request.GET.get('page')
        print(page_number)
        try: 
            page_obj = paginator.page(page_number) 
        except PageNotAnInteger: 
            page_obj = paginator.page(1) 
        except EmptyPage:
            page_obj = paginator.page(paginator.num_pages)
        serializer = productsSerializer(page_obj.object_list, many=True)
        print(dir(paginator))
        return Response({ 'count': paginator.count, 'total_pages': paginator.num_pages, 'current_page': int(page_number), 'products': serializer.data })
    
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
            imgs = ImagesByProducts.objects.filter(product=prod)
            
            imgs_serializer = imagesSerializer(imgs, many=True)
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
            'review_prom':promedio,
            'imgs':imgs_serializer.data,
        })
        
@api_view(['POST'])
def createReview(request):
    data = request.data
    
    product = products.objects.get(id=data['product'])
    
    review = Reviews.objects.create(product=product,            
            nombre_user=data['nombre_user'],
            rating=data['rating'],
            comentario=data['comment']
    )
    return Response(data)
            

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
    
@api_view(['GET'])
def SearchProducts(request,search):
    prods = products.objects.filter(nombre__icontains=search)
    if prods:
        products_serializer = productsSerializer(prods, many=True)
    
        return Response(products_serializer.data,status=200)
    else:
        return Response({'mensaje':'No se encontro ninguna coincidencia.'}, status=400)
    