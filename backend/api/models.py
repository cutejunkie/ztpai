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
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, db_index=True)
    title = models.CharField(max_length=200)
    birth_date = models.DateField(blank=True, null=True)
    content = models.TextField()
    is_favourite = models.BooleanField(default=False, db_index=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1, db_index=True)  # default=1 to ja
