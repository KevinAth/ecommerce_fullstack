from django.db import models
from django.conf import settings

# Create your models here.

class categories(models.Model):
    categoria = models.CharField(max_length=255)
      
    def __str__(self):
        return self.categoria

class products(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    categoria = models.ForeignKey(categories,on_delete=models.RESTRICT)
    precio = models.DecimalField(max_digits=10, decimal_places=2,default=0.00)
    stock = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    upload_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre

class ImagesByProducts(models.Model):
    product = models.ForeignKey(products,on_delete=models.CASCADE)
    img_1 = models.ImageField(upload_to='products/',blank=True)
    img_2 = models.ImageField(upload_to='products/',blank=True)
    img_3 = models.ImageField(upload_to='products/',blank=True)
    img_4 = models.ImageField(upload_to='products/',blank=True)
    img_5 = models.ImageField(upload_to='products/',blank=True)

class Reviews(models.Model):
    product = models.ForeignKey(products,on_delete=models.CASCADE,related_name='reviews')
    nombre_user= models.CharField(max_length=255)
    rating = models.IntegerField(choices=[(i,i) for i in range(1,6)])
    comentario = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    upload_at = models.DateTimeField(auto_now=True)