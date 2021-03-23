# Generated by Django 3.1.6 on 2021-03-23 14:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("user", "0001_initial"),
        ("ad", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="ad",
            name="created_by_user",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="user.profile"),
        ),
    ]
