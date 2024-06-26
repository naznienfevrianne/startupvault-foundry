# Generated by Django 4.1 on 2024-04-02 06:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0015_alter_usermodel_rejectionnote'),
        ('diaryentries', '0016_alter_entry_founder_alter_entry_lessonlearned_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FollowTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('founder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followed', to='authentication.founder')),
                ('investor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to='authentication.investor')),
            ],
        ),
    ]
