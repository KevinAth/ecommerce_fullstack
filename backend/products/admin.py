from django.contrib import admin
from .models import categories,products,Reviews,ImagesByProducts

# Register models here.

admin.site.register(products)

admin.site.register(categories)

admin.site.register(Reviews)

admin.site.register(ImagesByProducts)