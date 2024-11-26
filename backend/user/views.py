from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import customUser,addresses
from django.contrib.auth.hashers import make_password
import jwt
from datetime import datetime
from django.conf import settings
from .serializer import serializarAddress

@api_view(['POST'])
def AuthUser(request):
    try:
        email = request.data.get('email', '').strip()
        
        if not email:
            return Response({'mensaje': 'Ingrese un Correo electrónico válido'}, status=400)

        password = request.data.get('password', '').strip()

        try:
            user = customUser.objects.get(email=email)

            if not user.check_password(password):
                return Response({'mensaje': 'Contraseña o Correo electrónico incorrecto.'}, status=400)
            payload = {
                'username': user.username,
                'user_id': user.id,
                'iat': datetime.utcnow(),
            }
            token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
  
            return Response({'token': token}, status=200)

        except customUser.DoesNotExist:
            return Response({'mensaje': 'Contraseña o Correo electrónico incorrecto.'}, status=400)
    except Exception as e:
        return Response({'mensaje': f'Ha ocurrido un error al autenticar usuario: {str(e)}'}, status=500)

@api_view(['POST'])
def RegisterUser(request):
    import json
    try:
        
        data = json.loads(request.body)
    
        name = data.get('name')
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        birth = data.get('birth')

        if not all([email,username,password]):
            return Response({'mensaje':'Todos los campos requeridos deben ser completados.'},status=400)
        
        if customUser.objects.filter(username=username):
            return Response({'mensaje':'El nombre de usuario ya esta en uso.'},status=400)
        if customUser.objects.filter(email=email):
            return Response({'mensaje':'El correo electronico ya esta en uso.'},status=400)
        
        hash_password = make_password(password)
      
        user = customUser(name=name,username=username,email=email,password=hash_password,birth=birth)
        if user:
            user.save()
            return Response({'mensaje':'Usuario registrado'},status=200)
    except Exception as e:
        return Response({'mensaje':f"Error en registrar usuario :{e}"},status=400)
        
@api_view(['GET'])
def GetUserData(request):
    token = request.GET.get('token')
    user = request.GET.get('username')
    try:
        decode_payload = jwt.decode(token,settings.SECRET_KEY,algorithms=settings.JWT_ALGORITHM)
        if decode_payload.get('username') != user:
            return Response("Datos de ingreso Incorrectos",status=400)
        userdata = customUser.objects.get(username=user)
        data = {
            'user':userdata.name,
            'username':userdata.username,
            'email':userdata.email,
        }
    except Exception as e :
        return Response(e)
    return Response(data,status=200) 

@api_view(['PUT'])
def UpdateData(request,user):
    email = request.data.get("email")
    username = request.data.get("username")
    password = request.data.get("password")
    try:
        if not all([email,username,password]) :
            return Response({'mensaje':'Datos Requeridos'},status=400)
        usermodel = customUser.objects.get(username=user)
        if not usermodel:
            return Response({'mensaje':'Usuario no encontrado'},status=400)
        usermodel.email = email
        usermodel.username = username
        hash_password = make_password(password)
        usermodel.password = hash_password 
        if usermodel:   
            usermodel.save()
            payload = {
                'username':usermodel.username,
                'user_id':usermodel.id,
                'iat': datetime.utcnow(),
            }
            token = jwt.encode(payload,settings.JWT_SECRET_KEY,algorithm=settings.JWT_ALGORITHM,)
            return Response({'token':token,'mensaje':'Actualizacion de usuario realizado'},status=200)  
    except customUser.DoesNotExist:
        return Response({'mensaje':'Usuario no encontrado'},status=400)
    except Exception as e:
        return Response(f'Ha ocurrido un error :{e}',status=400)

@api_view(['DELETE'])
def DeleteAccount(request,username):
    
    try:
        user = customUser.objects.get(username=username)

        user.delete()
    except Exception as e:
        return Response({'mensaje':f'Ha ocurrido un error : {e}'},status=400) 
    return Response({'mensaje':'Cuenta eliminada con exito.'},status=200)

@api_view(['GET'])
def GetAddresses(request,username):
    try:
        user = customUser.objects.get(username=username)
        addresses_user = addresses.objects.filter(user=user.id)
        if addresses_user:
            serializar_address = serializarAddress(addresses_user , many=True)
            return Response(serializar_address.data)
    except addresses.DoesNotExist:
        return Response('No tiene elementos',status=200)
    except Exception as e :
        return Response(f'Ha ocurrido un error {e}',status=200)

@api_view(['POST'])
def CreateAddress(request,username):
    try:
        import json
        data = json.loads(request.body)
        
        nombre = data.get('nombre')
        pais = data.get('pais')
        direccion = data.get('direccion')
        ciudad = data.get('ciudad')
        codigo_postal = data.get('codigo_postal')
        user = customUser.objects.get(username=username)
        address = addresses(user=user,nombre=nombre,pais=pais,ciudad=ciudad,direccion=direccion,codigo_postal=codigo_postal)
        if address:
            address.save()
            return Response({'mensaje':'Direción Creada'},status=200)
            

    except Exception as e:
        return Response(e)
    return Response('hola')

@api_view(['DELETE'])
def DeleteAddress(request,id):
    try:
        address = addresses.objects.get(id=id)
        address.delete()
        return Response({'mensaje':'Dirección eliminada'})
    except Exception as e:
        return Response('error',e)