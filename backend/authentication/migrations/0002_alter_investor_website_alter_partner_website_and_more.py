# Generated by Django 5.0.2 on 2024-03-01 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='investor',
            name='website',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='partner',
            name='website',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='startup',
            name='image',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='startup',
            name='linkedin',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='startup',
            name='pitchdeck',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='startup',
            name='website',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='image',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='linkedin',
            field=models.TextField(),
        ),
    ]
