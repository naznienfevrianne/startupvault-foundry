# Generated by Django 5.0.2 on 2024-03-02 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_startup_linkedin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='startup',
            name='sector',
            field=models.TextField(blank=True),
        ),
    ]
