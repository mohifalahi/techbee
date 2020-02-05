from django.http import HttpResponse
from django.shortcuts import render
from .models import Place

# def home(request):
#     places = Place.objects
#     return render(request, 'index.html',{'places':places})

def submit_form(request):
    places = Place.objects
    if request.method == 'POST':
        # if request.POST.get('button'):
        #     post = Place()
        #     post.place = request.POST.get('place')
        #     post.device_type = request.POST.get('device_type')
        #     post.device = request.POST.get('device')
        #     post.unique_id = request.POST.get('unique_id')
        #     post.save()
        #     return render(request, 'index.html')
        # else:
        #     return render(request, 'index.html/admin')

        place = request.POST['place']
        device_type = request.POST['device_type']
        device = request.POST['device']
        unique_id = request.POST['unique_id']

        Place.objects.create(
            place = place,
            device_type = device_type,
            device = device,
            unique_id = unique_id
        )

    return render(request, 'index.html',{'places':places})
