# Generated by Django 3.1.6 on 2021-03-11 10:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='auth.user')),
                ('phone', models.CharField(max_length=80)),
                ('city', models.CharField(max_length=50)),
                ('birth_year', models.CharField(max_length=20)),
            ],
        ),
    ]
