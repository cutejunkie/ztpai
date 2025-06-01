from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def hello(request):
    return Response(
        {"data": {"message": "Witaj w API z Django REST Framework"}},
        status=status.HTTP_200_OK
    )

@api_view(['POST'])
def login_user(request):
    return Response(
        {"data": {}},
        status=status.HTTP_200_OK
    )

@api_view(['POST'])
def register_user(request):
    return Response(
        {"data": {}},
        status=status.HTTP_200_OK
    )