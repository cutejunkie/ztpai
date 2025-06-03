from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from api.models import Card, CustomUser
from django.shortcuts import get_object_or_404
from .serializers import CardSerializer
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
from django.http import JsonResponse


@api_view(['GET'])
def hello(request):
    print(request.user.is_authenticated)
    return Response(
        {"data": {"message": "Witaj w API z Django REST Framework"}},
        status=status.HTTP_200_OK
    )

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    print(username, password)

    if not username or not password:
        return Response({
            "error": {
                "code": 400,
                "message": "Podaj nazwę użytkownika i hasło"
            }
        }, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        request.session["user_id"] = user.id
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

    if CustomUser.objects.filter(username=username).exists():
        return Response({
            "error": {
                "code": 409,
                "message": "Użytkownik o podanej nazwie już istnieje"
            }
        }, status=status.HTTP_409_CONFLICT)

    user = CustomUser.objects.create_user(username=username, email=email, password=password)
    user.save()

    return Response({
        "data": {
            "message": "Zarejestrowano pomyślnie",
            "user_id": user.id
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_user_by_id(request, id):
    user = get_object_or_404(CustomUser, id=id)
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_card(request):
    serializer = CardSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  # przypisz kartę do aktualnego użytkownika
        return Response({
            "data": serializer.data,
            "message": "Karta została utworzona"
        }, status=status.HTTP_201_CREATED)
    else:
        return Response({
            "error": {
                "code": 400,
                "message": "Nieprawidłowe dane wejściowe",
                "details": serializer.errors
            }
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_cards(request):
    cards = Card.objects.filter(user=request.user)
    serializer = CardSerializer(cards, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def csrf_token_view(request):
    token = get_token(request)
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response.set_cookie('csrftoken', token)
    return response
