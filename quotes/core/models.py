from django.db import models
  
# Create your models here.
  
  
class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)
    # id = models.IntegerField(max_length=100)
    # title = models.CharField(max_length=500)
    # description = models.CharField(max_length=500)
    # start = models.DateTimeField()
    # end = models.DateTimeField()