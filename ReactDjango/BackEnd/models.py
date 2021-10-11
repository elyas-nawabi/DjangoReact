from django.db import models
from datetime import datetime 
# Create your models here.
  
  
class Schedular(models.Model):
    taskId = models.CharField(max_length=200)
    title = models.CharField(max_length=500, blank=True)
    description = models.CharField(max_length=500, blank=True)
    start = models.DateTimeField(default=datetime.now(), blank=True)
    end = models.DateTimeField(default=datetime.now(), blank=True)