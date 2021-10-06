from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from django.conf.urls import url
from core.views import *
from reactshedularDj.views import *
from reactshedularDj import views

router = routers.DefaultRouter()
router.register(r'', views.ReactView, 'reactshedularDj')
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('wel/', ReactView.as_view(), name="something"),
    # path('crud/', ReactView.as_view(), name="something"),
    path('crud/', include(router.urls)),
]