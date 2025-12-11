from django.urls import path

from . import views as v

app_name = 'tanks'

urlpatterns = [
    path('', v.tank, name='tank'),
    path('level/', v.tank_data, name="tank-data"),
    path("history/", v.tank_history, name="tank_history"), 
]
