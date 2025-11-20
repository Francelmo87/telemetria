from django.shortcuts import render
from django.http import JsonResponse
import random


def tank(request):
    template_name='tank.html'
    return render(request, template_name)

def tank_data(request):
    value = random.randint(1, 100)
    return JsonResponse({"value": value / 100})