from django.db import models

class Place(models.Model):
    place = models.CharField(max_length=50)
    device_type = models.CharField(max_length=50)
    device = models.CharField(max_length=50)
    unique_id = models.CharField(max_length=50)
    icon_class = models.CharField(max_length=50)
