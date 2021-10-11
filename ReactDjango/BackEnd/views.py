from rest_framework import status
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import viewsets
from . models import *
from rest_framework.response import Response
from . serializer import *

# Create your views here.
# class ReactView(APIView):

#     serializer_class = ReactSerializer

#     def get(self, request):
#         detail = [{"TaskId": detail.TaskId, "title": detail.title, "description": detail.description, "start": detail.start, "end": detail.end}
#                   for detail in React.objects.all()]
#         return Response(detail)

#     def post(self, request):

#         serializer = ReactSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
#     def put(self, request, pk):
#         task = React.objects.get(pk=pk)
#         return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = ReactSerializer(
#         react, data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request,pk):
#         task = React.objects.get(pk=pk)
#         task.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

    
# class ReactView(viewsets.ModelViewSet):
    
#     serializer_class = ReactSerializer
#     queryset = React.objects.all()

@api_view(['GET', 'POST'])
def schedular_list(request):
    """
    List all code snippets, or create a new schedular.
    """
    if request.method == 'GET':
        schedular = Schedular.objects.all()
        serializer = SchedularSerializer(schedular, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SchedularSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def schedular_detail(request, taskId):
    """
    Retrieve, update or delete a code schedular.
    """
    print(request.method," test 1")

    try:
        schedular = Schedular.objects.get(taskId=taskId)
    except Schedular.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SchedularSerializer(schedular)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SchedularSerializer(schedular, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        print(request.method," test 2")
        schedular.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

