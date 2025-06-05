from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from api.models import Card, CustomUser
from django.shortcuts import get_object_or_404
from .serializers import CardSerializer, ProfileSerializer
from django.middleware.csrf import get_token
from django.http import JsonResponse
from drf_spectacular.utils import extend_schema, OpenApiTypes


@extend_schema(
    summary="says hello",
    responses={200: OpenApiTypes.STR}
)
@api_view(['GET'])
def hello(request):
    print(request.user.is_authenticated)
    return Response(
        {"data": {"message": "Welcome to the Django REST API"}},
        status=status.HTTP_200_OK
    )

@extend_schema(
    summary="Log in user",
    tags=["Auth"],
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'username': {'type': 'string'},
                'password': {'type': 'string'},
            },
            'required': ['username', 'password']
        }
    },
    responses={
        200: OpenApiTypes.OBJECT,
        400: OpenApiTypes.OBJECT,
        401: OpenApiTypes.OBJECT
    }
)
@csrf_exempt
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({
            "error": {
                "code": 400,
                "message": "Username and password are required"
            }
        }, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        request.session["user_id"] = user.id
        return Response({
            "data": {
                "message": "Login successful",
                "username": user.username,
                "user_id": user.id
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            "error": {
                "code": 401,
                "message": "Invalid username or password"
            }
        }, status=status.HTTP_401_UNAUTHORIZED)


@extend_schema(
    summary="Register a new user",
    tags=["Auth"],
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'username': {'type': 'string'},
                'email': {'type': 'string'},
                'password': {'type': 'string'}
            },
            'required': ['username', 'email', 'password']
        }
    },
    responses={
        201: OpenApiTypes.OBJECT,
        400: OpenApiTypes.OBJECT,
        409: OpenApiTypes.OBJECT
    }
)
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({
            "error": {
                "code": 400,
                "message": "All fields are required"
            }
        }, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(username=username).exists():
        return Response({
            "error": {
                "code": 409,
                "message": "Username already exists"
            }
        }, status=status.HTTP_409_CONFLICT)

    user = CustomUser.objects.create_user(username=username, email=email, password=password)
    user.save()

    return Response({
        "data": {
            "message": "Registration successful",
            "user_id": user.id
        }
    }, status=status.HTTP_201_CREATED)
    
@extend_schema(
    summary="Get user by ID (only self)",
    tags=["User"],
    responses={
        200: OpenApiTypes.OBJECT,
        403: OpenApiTypes.OBJECT,
        404: OpenApiTypes.OBJECT
    }
)    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_id(request, id):
    user = get_object_or_404(CustomUser, id=id)
    
    if request.user.id != user.id:
        return Response({
            "error": {
                "code": 403,
                "message": "You do not have permission to view this user"
            }
        }, status=status.HTTP_403_FORBIDDEN)

    return Response({
        "data": {
            "id": user.id,
            "username": user.username,
        }
    }, status=status.HTTP_200_OK)

@extend_schema(
    summary="Get card by UUID",
    tags=["Card"],
    responses={
        200: OpenApiTypes.OBJECT,
        404: OpenApiTypes.OBJECT
    }
)
@api_view(['GET'])
def get_card_by_uuid(request, uuid):
    try:
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
    except:
        return Response({
            "error": {
                "code": 404,
                "message": "Card not found"
            }
        }, status=status.HTTP_404_NOT_FOUND)


@extend_schema(
    summary="Get or create user's cards",
    tags=["Card"],
    responses={
        200: CardSerializer(many=True),
        201: CardSerializer,
        422: OpenApiTypes.OBJECT
    },
    request=CardSerializer
)
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_cards(request):
    if request.method=='GET':
        cards = Card.objects.filter(user=request.user)
        serializer = CardSerializer(cards, many=True)
        return Response(
            {
                "data": serializer.data,
                "message": "User cards retrieved successfully"
            },
            status=status.HTTP_200_OK
        )
    
    serializer = CardSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({
            "data": serializer.data,
            "message": "Card created successfully"
        }, status=status.HTTP_201_CREATED)
    else:
        return Response({
            "error": {
                "code": 422,
                "message": "Invalid card data",
                "details": serializer.errors
            }
        }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


@extend_schema(
    summary="Get user's favourite cards",
    tags=["Card"],
    responses={
        200: CardSerializer(many=True)
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_favourites(request):
    cards = Card.objects.filter(user=request.user, is_favourite=True)
    serializer = CardSerializer(cards, many=True)
    return Response(
        {
            "data": serializer.data,
            "message": "Favourite cards retrieved successfully"
        },
        status=status.HTTP_200_OK
    )


@extend_schema(
    summary="Set CSRF cookie",
    tags=["Token"],
    responses={200: OpenApiTypes.OBJECT}
)
@api_view(['GET'])
def csrf_token_view(request):
    token = get_token(request)
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response.set_cookie('csrftoken', token)
    return response


@extend_schema(
    summary="Log out current user",
    tags=["Auth"],
    responses={200: OpenApiTypes.OBJECT}
)
@api_view(['GET'])
def logout_user(request):
    logout(request)
    return Response(
        {"message": "Logout successful"},
        status=status.HTTP_200_OK
    )

@extend_schema(
    summary="Get current user's profile",
    tags=["User"],
    responses={200: ProfileSerializer}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    serializer = ProfileSerializer(request.user)
    return Response(
        {
            "data": serializer.data,
            "message": "User data retrieved successfully"
        },
    status=status.HTTP_200_OK
    )