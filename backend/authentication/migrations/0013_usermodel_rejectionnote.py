# Generated by Django 4.1 on 2024-03-09 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_merge_20240309_0926'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='rejectionNote',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
