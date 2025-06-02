from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from api.models import Card
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def hello(request):
    return Response(
        {"data": {"message": "Witaj w API z Django REST Framework"}},
        status=status.HTTP_200_OK
    )

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({
            "error": {
                "code": 400,
                "message": "Podaj nazwę użytkownika i hasło"
            }
        }, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            "data": {
                "message": "Zalogowano pomyślnie",
                "username": user.username,
                "user_id": user.id
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            "error": {
                "code": 401,
                "message": "Nieprawidłowe dane logowania"
            }
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({
            "error": {
                "code": 400,
                "message": "Wszystkie pola są wymagane"
            }
        }, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({
            "error": {
                "code": 409,
                "message": "Użytkownik o podanej nazwie już istnieje"
            }
        }, status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    return Response({
        "data": {
            "message": "Zarejestrowano pomyślnie",
            "user_id": user.id
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_user_by_id(request, id):
    user = get_object_or_404(User, id=id)
    return Response(
        {
            "data": {
                "id": user.id,
                "username": user.username,
            }
        },
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
def get_card_by_uuid(request, uuid):
    card = get_object_or_404(Card, uuid=uuid)
    return Response(
        {
            "data": {
                "uuid": str(card.uuid),
                "title": card.title,
            }
        },
        status=status.HTTP_200_OK
    )