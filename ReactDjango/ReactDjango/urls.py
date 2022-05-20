from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from django.conf.urls import url
from backend.views import *
from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
     path('schedulars/', views.schedular_list),
    path('schedulars/<taskId>', views.schedular_detail),
    # path('crud/', include(router.urls)),
    
]