# Generated by Django 5.0.2 on 2024-03-03 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_alter_startup_sector'),
    ]

    operations = [
        migrations.AlterField(
            model_name='founder',
            name='phoneNumber',
            field=models.CharField(max_length=12),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='password',
            field=models.CharField(max_length=12),
        ),
    ]
