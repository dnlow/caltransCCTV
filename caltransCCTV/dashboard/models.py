from django.db import models
from django.core.exceptions import *
import time

# Create your models here.

class Camera(models.Model):
    '''Camera object representing Cal Trans CCTV Cameras'''
    image_link = models.CharField(max_length = 250)
    name = models.CharField(max_length = 200)
    feed = models.CharField(max_length = 300)

    class Meta:
        db_table = "cameras"

    def __init__(self, name, link):
        self.name = name
        self.image_link = link
        self.addToTable()

    def updateFeed(self, feed):
        try:
            camera = Camera.objects.get(name = self.name)
            camera.feed = feed
        except DoesNotExist:
            return

    def addToTable(self):
        try:
            camera = Camera.objects.get(name = self.name)
        except DoesNotExist:
            camera = Camera.objects.create(name = self.name, image_link = self.image_link)
        return

