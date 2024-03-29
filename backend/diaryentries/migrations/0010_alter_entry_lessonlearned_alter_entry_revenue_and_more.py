# Generated by Django 4.1 on 2024-03-06 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diaryentries', '0009_alter_entry_founder_delete_founder'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='lessonLearned',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='entry',
            name='revenue',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='entry',
            name='sales',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='entry',
            name='user',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
