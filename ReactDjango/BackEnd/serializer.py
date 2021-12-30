from rest_framework import serializers
from . models import *
  
class SchedularSerializer(serializers.ModelSerializer):
    taskId = serializers.JSONField()
    class Meta:
        model = Schedular
        fields = ['taskId', 'title','description', 'start', 'end', 'recurrenceId', 'recurrenceRule','recurrenceExceptions']