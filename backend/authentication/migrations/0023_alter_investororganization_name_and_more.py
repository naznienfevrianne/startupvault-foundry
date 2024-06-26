# Generated by Django 4.1 on 2024-05-14 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0022_delete_top10temp_alter_top10startup_rank1_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='investororganization',
            name='name',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='investororganization',
            name='typ',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='partnerorganization',
            name='name',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='startup',
            name='name',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='startup',
            name='typ',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='name',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='password',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='rejectionNote',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='role',
            field=models.TextField(),
        ),
    ]
