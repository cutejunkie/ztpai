from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['uuid', 'title', 'content', 'birth_date', 'favourite']
        read_only_fields = ['uuid', 'user']
