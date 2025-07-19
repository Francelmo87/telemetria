from django.urls import path

from . import views as v

app_name = 'tank'

urlpatterns = [
    path('', v.tank, name='tank')
]
