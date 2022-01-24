import os
from django.core.management.base import BaseCommand
from resturent_apiApp.models import Returent

class Command(BaseCommand):
    def handle(self, *args, **options):
        title_path = r"E:\Django Projects\1. Resturent api\resturent_api\resturent_apiApp\management\contents\titles.txt"

        with open(title_path) as title:
            lines = title.readlines()

            for index, line in enumerate(lines):
                resturent = Returent()
                resturent.title = line
                resturent.image = f"media/dineinImages/{index}.jpg"
                resturent.body = "One of the most popular items on the menu among Uber Eats users is the Donuts and the Assorted 6 Donuts and the Maple Sugar Bacon Breakfast Sandwich are two of the items most commonly ordered together at this early morning go-to. • $ • Breakfast and Brunch • Donuts"
                resturent.save()
                print(index)