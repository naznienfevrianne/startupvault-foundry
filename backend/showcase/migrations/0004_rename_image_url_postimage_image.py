# Generated by Django 4.1 on 2024-03-08 04:15

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("showcase", "0003_alter_postimage_image_url"),
    ]

    operations = [
        migrations.RenameField(
            model_name="postimage",
            old_name="image_url",
            new_name="image",
        ),
    ]
