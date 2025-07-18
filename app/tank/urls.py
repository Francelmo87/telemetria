from django.urls import path

from . import views as v

app_name = 'app.tank'

urlpatterns = [
    path('', v.tank, name='tank')
]
