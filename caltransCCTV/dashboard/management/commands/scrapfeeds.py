from django.core.management.base import BaseCommand, CommandError
from dashboard.models import Camera as Feed
import requests
from bs4 import BeautifulSoup

class BaseCommand(BaseCommand):
    help = 'Scrapes CalTrans website for still of CCTV cameras'

    def add_arguments(self, parser):
        parser.add_arguments('img_path', nargs='+', type=str)

    def handle(self, *args, **options):
        for path in options['img_path']:
            try:
                feed = Feed.objects.get(img_link = path)
                # Scrape for new feed
                feed.feed = feed
                feed.save()
            except Feed.DoesNotExist:
                pass
