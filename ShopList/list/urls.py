from django.conf.urls import include, url
from rest_framework import routers
from list import views

list_router = routers.DefaultRouter()
list_router.register(r'listitem', views.ListItemViewSet, base_name='listitem')

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url('^api/', include(list_router.urls)),
]
