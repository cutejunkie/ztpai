from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello),
    path('login/', views.login_user),
    path('register/', views.register_user),
    path('cards/', views.create_card),

    path('users/<int:id>/', views.get_user_by_id),
    path('cards/<uuid:uuid>/', views.get_card_by_uuid),
]