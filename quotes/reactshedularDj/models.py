from django.db import models
from datetime import datetime 
# Create your models here.
  
  
class React(models.Model):
    TaskId = models.CharField(max_length=200)
    title = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    start = models.DateTimeField(default=datetime.now(), blank=True)
    end = models.DateTimeField(default=datetime.now(), blank=True)