# Generated by Django 5.0.2 on 2024-02-18 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dummy',
            name='id_dummy',
        ),
        migrations.RemoveField(
            model_name='user',
            name='id_user',
        ),
        migrations.AddField(
            model_name='dummy',
            name='text',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(default='', max_length=255),
        ),
    ]
