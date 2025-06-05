from django.contrib import admin
from django.urls import path, include

from django.conf.urls import handler404, handler500, handler403
from django.http import JsonResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
]

def custom_404_view(request, exception=None):
    return JsonResponse({
        "error": {
            "code": 404,
            "message": "Endpoint not found"
        }
    }, status=404)

def custom_403_view(request, exception=None):
    return JsonResponse({
        "error": {
            "code": 403,
            "message": "Access forbidden"
        }
    }, status=403)

def custom_500_view(request):
    return JsonResponse({
        "error": {
            "code": 500,
            "message": "Internal server error"
        }
    }, status=500)

handler403 = custom_403_view
handler404 = custom_404_view
handler500 = custom_500_view
