from django.shortcuts import render


def tank(request):
    template_name = 'tank.html'
    return render(request, template_name)