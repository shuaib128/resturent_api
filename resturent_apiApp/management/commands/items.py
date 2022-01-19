import os
from random import random
from django.core.management.base import BaseCommand, CommandError
from resturent_apiApp.models import Returent, Item, Catrgory
from django.shortcuts import get_object_or_404
import random


class Command(BaseCommand):
    def handle(self, *args, **options):
        count = 0
        title_path = r"E:\Django Projects\1. Resturent api\resturent_api\resturent_apiApp\management\contents\titles.txt"
        category_list = ["Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark", "Parallel 37", "Starbelly", "Brass Tacks", "Lord Stanley", "Top of the Mark"]

        with open(title_path) as title:
            lines = title.readlines()

            for line in lines:
                #make category instance
                category = Catrgory()
                categoryTitle = category_list[count]
                if Catrgory.objects.filter(title = categoryTitle).exists():
                    pass
                else:
                    category.title = categoryTitle
                    category.save()

                #Make item instance
                item = Item()
                item.title = line
                item.body = "One of the most popular items on the menu among Uber Eats users is the Donuts and the Assorted 6 Donuts and the Maple Sugar Bacon Breakfast Sandwich are two of the items most commonly ordered together at this early morning go-to. • $ • Breakfast and Brunch • Donuts"
                item.category = get_object_or_404(Catrgory, title=categoryTitle)
                item.price = random.randint(2, 21)
                item.devivery = True
                item.save()

                #Add item to resturent
                resturent = get_object_or_404(Returent, id=random.randint(1, 20))
                created_item = get_object_or_404(Item, title=line)
                resturent.foodItems.add(
                    created_item
                )
                print(count)
                count += 1