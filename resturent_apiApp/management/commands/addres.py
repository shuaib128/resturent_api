import os
from django.core.management.base import BaseCommand, CommandError
from resturent_apiApp.models import Returent
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

class Command(BaseCommand):
    def handle(self, *args, **options):
        title_path = r"E:\Django Projects\1. Resturent api\resturent_api\resturent_apiApp\management\contents\titles.txt"

        with open(title_path) as title:
            lines = title.readlines()

            for line in lines:
                resturent = Returent()
                resturent.title = line
                resturent.body = "One of the most popular items on the menu among Uber Eats users is the Donuts and the Assorted 6 Donuts and the Maple Sugar Bacon Breakfast Sandwich are two of the items most commonly ordered together at this early morning go-to. • $ • Breakfast and Brunch • Donuts"
                resturent.save()