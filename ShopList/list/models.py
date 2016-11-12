from __future__ import unicode_literals

from django.db import models


class ListItem(models.Model):
    name = models.CharField(blank=False, max_length=200)
    state = models.BooleanField(default=False)
    qty = models.IntegerField()
    username = models.CharField(blank=True, max_length=100)

    def __unicode__(self):
        return self.name
