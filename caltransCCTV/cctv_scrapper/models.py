from django.db import models

# Create your models here.

class CameraFeed(models.Model):
    camera = models.CharField(max_length = 300)
    feed_img = models.CharField(max_length = 300)
    time_stamp = models.CharField(max_length = 50)

    class Meta:
        db_table = "scrapped_feeds"
    
    