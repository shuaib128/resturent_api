from django.db import models
from djmoney.models.fields import MoneyField
from PIL import Image as IMG
from django.contrib.auth.models import User

# Create your models here.
class Catrgory(models.Model):
    title = models.CharField(default="Catagory" ,max_length=200)

    def __str__(self):
        return self.title


class Item(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField(default="Body")
    image = models.ImageField(null=True, blank=True, upload_to='media/dineinImages', default='media/dineinImages/pexels-adonyi-gábor-1414651_1cjSUoF.jpg')
    category = models.ForeignKey(Catrgory, on_delete=models.CASCADE)
    price = MoneyField( decimal_places=2, default=0, default_currency='USD', max_digits=11)
    item_structor = models.TextField(default='[["ssss","sss","23"]]', null=True, blank=True,)
    devivery = models.BooleanField(default=False)
    pickup = models.BooleanField(default=False)
    dine_in = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}-{self.id}"

    def save(self, *args, **kwargs):
        super(Item, self).save(*args, **kwargs)

        img = IMG.open(self.image.path)
        if img.height > 300 or img.width > 300:
            new_img = (700, 700)
            img.thumbnail(new_img)
            img.save(self.image.path)


class Returent(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    image = models.ImageField(null=True, blank=True, upload_to='media/dineinImages', default='media/dineinImages/pexels-adonyi-gábor-1414651_1cjSUoF.jpg')
    foodItems = models.ManyToManyField(
        Item,
        related_name='foodsItem',
        null=True, blank=True,
    )
    distance = models.CharField(max_length=200, default="5–15 min")
    delevary_fee = MoneyField( decimal_places=2, default=0, default_currency='USD', max_digits=11)
    store_location = models.CharField(max_length=200, default="381 Canal St, New York, NY 10013")
    store_longitude = models.FloatField(default=0)
    store_latitude  = models.FloatField(default=0)

    def __str__(self):
        return f"{self.title}-{self.id}"

    def save(self, *args, **kwargs):
        super(Returent, self).save(*args, **kwargs)

        img = IMG.open(self.image.path)
        if img.height > 300 or img.width > 300:
            new_img = (700, 700)
            img.thumbnail(new_img)
            img.save(self.image.path)