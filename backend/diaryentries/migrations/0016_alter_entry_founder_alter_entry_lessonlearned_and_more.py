# Generated by Django 4.1 on 2024-03-09 03:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_merge_20240309_0926'),
        ('diaryentries', '0015_merge_20240309_0926'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='founder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entries', to='authentication.founder'),
        ),
        migrations.AlterField(
            model_name='entry',
            name='lessonLearned',
            field=models.TextField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='entry',
            name='revenue',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='entry',
            name='sales',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='entry',
            name='user',
            field=models.PositiveIntegerField(),
        ),
    ]
