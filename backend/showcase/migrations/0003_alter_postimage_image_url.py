# Generated by Django 4.1 on 2024-03-08 04:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("showcase", "0002_remove_postimage_image_postimage_image_url"),
    ]

    operations = [
        migrations.AlterField(
            model_name="postimage",
            name="image_url",
            field=models.TextField(),
        ),
    ]
