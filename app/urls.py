from django.urls import path
from . import views

urlpatterns = [
    # path('', views.home, name='home'),
    path('', views.home, name='dashboard'),
    path('devices', views.submit_form, name='devices'),
    path('charts', views.chart, name='charts')
]