from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello),
    path('login/', views.login_user),
    path('register/', views.register_user),
    path('logout/', views.logout_user),
    path('cards/', views.user_cards),
    path('csrf/', views.csrf_token_view),
    path('cards/favourites/', views.get_user_favourites),
    path('user/profile/', views.user_profile),

    path('users/<int:id>/', views.get_user_by_id),
    path('cards/<uuid:uuid>/', views.get_card_by_uuid),
]