from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from django.conf.urls import url
from BackEnd import views

router = routers.DefaultRouter()
router.register(r'', views.ReactView, 'BackEnd')
urlpatterns = [
    path('admin/', admin.site.urls),
     path('schedulars/', views.schedular_list),
    path('schedulars/<int:pk>', views.schedular_detail),
    # path('crud/', include(router.urls)),

]