from django.http import HttpResponse
from django.shortcuts import render
from .models import Place

def home(request):
    places = Place.objects
    return render(request, 'index.html',{'places':places})

def submit_form(request):
    places = Place.objects
    if request.method == 'POST':
        place = request.POST['place']
        device_type = request.POST['device_type']
        device = request.POST['device']
        unique_id = request.POST['unique_id']
        icon_class = request.POST['icon_class']

        Place.objects.create(
            place = place,
            device_type = device_type,
            device = device,
            unique_id = unique_id,
            icon_class = icon_class
        )
    return render(request, 'devices.html',{'places':places})

def chart(request):
    return render(request, 'charts.html')