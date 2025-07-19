from django.urls import path

from . import views as v

app_name = 'base'

urlpatterns = [
    path('',v.index, name='index'),
]
