from django.shortcuts import render
from django.http import JsonResponse
import random
from django.utils import timezone

from .models import WaterLevel

def tank(request):
    template_name='tank.html'
    return render(request, template_name)

def tank_data(request):
    value = random.randint(1, 100)
    
    WaterLevel.objects.create(value=value)  # salva histórico
    
    return JsonResponse({"value": value / 100})


def tank_history(request):
    # Pega os últimos  registros
    data = WaterLevel.objects.order_by("-created_at")[:25]

    result = [
        {
            "time": timezone.localtime(item.created_at).strftime("%H:%M:%S"), 
            "value": item.value
         }
        for item in reversed(data)  # ordem cronológica
    ]

    return JsonResponse(result, safe=False)

