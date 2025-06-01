from django.urls import path
from . import views
# from .views import hello

urlpatterns = [
    path('hello/', views.hello),
    path('login/', views.login_user),
    path('register/', views.register_user),
]