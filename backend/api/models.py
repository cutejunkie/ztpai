# TABELE W BAZIE DANCYH
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')


class Card(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    title = models.CharField(max_length=200)
    content = models.TextField()
    # user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='cards')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)  # ja xd

