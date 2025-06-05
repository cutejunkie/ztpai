from rest_framework import serializers
from .models import Card, CustomUser

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['uuid', 'title', 'content', 'birth_date', 'is_favourite']
        read_only_fields = ['uuid', 'user']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'date_joined']
        read_only_fields = ['id', 'username', 'date_joined']