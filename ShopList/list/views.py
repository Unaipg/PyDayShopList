from django.shortcuts import render
from rest_framework import viewsets

from list.models import ListItem
from list.serializers import ListItemSerializer


class ListItemViewSet(viewsets.ModelViewSet):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer


def index(request):
    return render(request, 'base.html')
