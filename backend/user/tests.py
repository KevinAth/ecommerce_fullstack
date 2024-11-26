from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from .models import customUser
from rest_framework import status

class CustomUserModelTest(TestCase):
    def setUp(self):
        self.user = customUser.objects.create_user(
            username='kevin6',
            email='kevin@gmail.com',
            password='kevin11', 
            name='kevin',
            birth='2002-05-05'
        )
    def test_user_username(self):
        self.assertEqual(self.user.username, 'kevin6')

    def test_user_email(self):
        self.assertEqual(self.user.email, 'kevin@gmail.com')


class AuthUserViewsTest(TestCase):
    def setUp(self):
        self.user = customUser.objects.create_user(
            username='kevin6',
            email='kevin@gmail.com',
            password='kevin11',
            name='kevin',
            birth='2002-05-05'
        )

    def test_login_view(self):
        response = self.client.post(reverse('authuser'), {
            'email': 'kevin@gmail.com',
            'password': 'kevin11'
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response,'token')
        
    def test_does_not_email_view(self):
        response = self.client.post(reverse('authuser'),{
            'password':'kevin1222'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'mensaje': 'Ingrese un Correo electrónico válido'})
        
    def test_does_not_exist_view(self):
        response = self.client.post(reverse('authuser'),{
            "email":"kevin@gmail.com",
            "password":"kevin11"
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {'mensaje': 'Contraseña o Correo electrónico incorrecto.'})
    
    def test_does_not_password(self):
        response = self.client.post(reverse('authuser'),{
            "email":"kevin@gmail.com",
            "password":"kevin12",
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data,{'mensaje': 'Contraseña o Correo electrónico incorrecto.'})
        
        
    
class RegisterUserViewsTest(TestCase):
    def setUp(self):
        self.user = {
            "username":"kevin6",
            "email":"kevin@gmail.com",
            "password":"kevin11",
            "name":"kevin",
            "birth":"2002-05-05",
            }
        
        self.createUser = customUser.objects.create_user(
            username='kevin',
            email='kevin12@gmail.com',
            password='kevin11',
            name='kevin',
            birth='2002-05-05'
        )
        
    def test_create_view(self):
        response = self.client.post(reverse('registeruser'), self.user,content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response,'Usuario registrado')
        
    def test_data_validation_username_view(self):
        response = self.client.post(reverse('registeruser'), {
            "username":"kevin",
            "email":"kevin12@gmail.com",
            "password":"kevin11",
            "name":"kevin",
            "birth":"2002-05-05",
            },content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'mensaje':'El nombre de usuario ya esta en uso.'})
        
    def test_data_validation_email_view(self):
        response = self.client.post(reverse('registeruser'), {
            "username":"kevin1",
            "email":"kevin12@gmail.com",
            "password":"kevin11",
            "name":"kevin",
            "birth":"2002-05-05",
            },content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'mensaje': 'El correo electronico ya esta en uso.'})
        
    def test_not_email_data_view(self):
        self.user_whiout_data = {
        "username":"kevin6",
        "email":"kevin13@gmail.com",
        "password":"kevin11",
        "name":"kevin",
        "birth":"2002-05-05",
        }
        
        response = self.client.post(reverse('registeruser'),self.user_whiout_data,content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'mensaje':'Todos los campos requeridos deben ser completados.'})
        
    def test_not_password_data_view(self):
        self.user_whiout_data = {
        "username":"kevin6",
        "email":"kevin13@gmail.com",
        "name":"kevin",
        "birth":"2002-05-05",
        }
        
        response = self.client.post(reverse('registeruser'),self.user_whiout_data,content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'mensaje':'Todos los campos requeridos deben ser completados.'})
    
class UpdateUserViewsTest(TestCase):
    def setUp(self):
        self.user = customUser.objects.create_user(
            username='kevin',
            email='kevin12@gmail.com',
            password='kevin11',
            name='kevin',
            birth='2002-05-05'
        )
    def test_no_all_data_to_update(self):
        userIncomplete = {"email":"kevin@12gmail.com","username":"kevin"}
        response = self.client.put(reverse('updateuser',kwargs={'user':userIncomplete['username']}),userIncomplete,content_type='application/json')
        self.assertEqual(response.status_code,400)
        self.assertEqual(response.data,{"mensaje":"Datos Requeridos"})
        
    def test_does_not_user(self):
        data = {
        "username":"kevin6",
        "password":"kevin11",
        "name":"kevin",
        "email":"kevin@gmail.com"
        }
        response = self.client.put(reverse('updateuser',kwargs={'user':'kevin'}),data,content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data,{'mensaje':'Usuario no encontrado'})
        
    def test_update_user(self):
        data = {
            "username":"kevin13",
            "password":"keivn13",
            "email":"kevin13@",
            "name":"kevin ATH",
        }
        response = self.client.put(reverse('updateuser',kwargs={'user': self.user.username}),data,content_type='application/json')
        print(response.content)
        self.assertEqual(response.status_code, 200)
        
        self.assertIn('mensaje',response.data)
        self.assertEqual(response.data['mensaje'], 'Actualizacion de usuario realizado')
        
        self.assertIn('token',response.data)
        self.assertContains(response,'token')