# Generated by Django 4.1 on 2024-05-01 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='image',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
