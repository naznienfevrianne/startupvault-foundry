# Generated by Django 4.1 on 2024-04-30 08:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0019_merge_20240430_1542'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('summary', models.CharField(max_length=250)),
                ('desc', models.TextField(max_length=1000)),
                ('location', models.TextField()),
                ('date', models.DateField()),
                ('price', models.IntegerField()),
                ('link', models.TextField()),
                ('isVerified', models.IntegerField()),
                ('rejectionNote', models.CharField(blank=True, default='', max_length=255)),
                ('partner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='partner', to='authentication.partner')),
            ],
        ),
    ]
