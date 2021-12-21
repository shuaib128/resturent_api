from django.db import models
from django.contrib.auth.models import User
from resturent_apiApp.models import Returent

# Create your models here.
# User Profile
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank=True, upload_to='media/profileImage',)
    joined_date = models.DateTimeField(auto_now_add= True)
    address = models.CharField(max_length=150, blank=True)
    Followes = models.ManyToManyField(User, related_name='flowwers', null=True, blank=True,)
    returent = models.ManyToManyField(Returent, related_name='returent', null=True, blank=True,)
    business_account = models.BooleanField(default=False)
    rider_account = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} Profile"