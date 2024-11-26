from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username , email , password=None, birth='2000-01-01', **extra_fields):
        if not email:
            raise ValueError('El campo de correo electronico debe ser establecido')
        email = self.normalize_email(email)
        user = self.model(username=username,email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username , email , password=None, birth='00-00-0000',**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(username , email ,password ,birth,**extra_fields)
    
class customUser(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(unique=True,max_length=150)
    email = models.EmailField(unique=True,max_length=255)
    password = models.CharField(max_length=128)
    name = models.CharField(max_length=255)
    birth = models.DateField(null='2000-01-01')
    dateJoined = models.DateTimeField(auto_now_add=True)
    dateLogin = models.DateTimeField(auto_now=True)
    isActive = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)    
    is_superuser = models.BooleanField(default=False)
    
    objects=UserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','password'] 
        
    def __str__(self):
        return self.username +' -> '+ self.email

class addresses(models.Model):
    user = models.ForeignKey(customUser,on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    pais = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    codigo_postal = models.IntegerField()