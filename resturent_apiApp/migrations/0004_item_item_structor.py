# Generated by Django 3.2.6 on 2021-12-27 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resturent_apiApp', '0003_remove_returent_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='item_structor',
            field=models.TextField(blank=True, default='[["ssss","sss","23"]]', null=True),
        ),
    ]