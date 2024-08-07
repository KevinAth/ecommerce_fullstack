from rest_framework import serializers
from .models import products,categories,Reviews,ImagesByProducts

class productsSerializer(serializers.ModelSerializer):
    class Meta:
        model = products
        fields = '__all__'

class categoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = categories
        fields = ['categoria']
        
class reviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'

class imagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesByProducts
        fields = ['img_1','img_2','img_3','img_4','img_5']