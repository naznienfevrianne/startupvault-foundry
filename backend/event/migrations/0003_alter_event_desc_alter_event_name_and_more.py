# Generated by Django 4.1 on 2024-05-14 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_event_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='desc',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='event',
            name='name',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='event',
            name='summary',
            field=models.TextField(),
        ),
    ]
