from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include('app.base.urls')),
    path('tank/', include('app.tank.urls')),
    path('admin/', admin.site.urls),
]
