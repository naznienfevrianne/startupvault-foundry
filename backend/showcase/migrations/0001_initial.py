# Generated by Django 4.1 on 2024-03-05 12:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0004_remove_dummy_id_dummy_remove_user_id_user_dummy_text_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShowcasePost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='showcase_posts', to='user.user')),
            ],
        ),
        migrations.CreateModel(
            name='PostImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='showcase_images/')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='showcase.showcasepost')),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('showcase_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='showcase.showcasepost')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='liked_posts', to='user.user')),
            ],
            options={
                'unique_together': {('showcase_post', 'user')},
            },
        ),
    ]
