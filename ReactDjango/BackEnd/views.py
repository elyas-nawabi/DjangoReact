from django.shortcuts import render
from rest_framework.views import APIView
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

    
class ReactView(viewsets.ModelViewSet):
    
    serializer_class = ReactSerializer
    queryset = React.objects.all()






#     @api_view(['PUT', 'DELETE'])
# def students_detail(request, pk):
    # try:
    #     student = Student.objects.get(pk=pk)
    # except Student.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)

    # if request.method == 'PUT':
    #     serializer = StudentSerializer(
    #         student, data=request.data, context={'request': request})
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # elif request.method == 'DELETE':
    #     student.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
