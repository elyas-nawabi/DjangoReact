from rest_framework import serializers
from . models import *
  
class SchedularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedular
        fields = ['taskId', 'title','description', 'start', 'end']