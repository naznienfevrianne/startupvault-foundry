# Generated by Django 4.1 on 2024-03-05 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_alter_usermodel_email'),
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
            field=models.CharField(max_length=255),
        ),
    ]
