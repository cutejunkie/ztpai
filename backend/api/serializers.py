from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['uuid', 'title', 'content']  # user nie musi być tutaj – przypisujemy go w widoku
