# Generated by Django 3.1.6 on 2021-04-07 13:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("rating", "0001_initial"),
        ("ad", "0003_auto_20210407_1444"),
    ]

    operations = [
        migrations.AlterField(
            model_name="ad",
            name="rating",
            field=models.ForeignKey(
                blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to="rating.rating"
            ),
        ),
        migrations.AlterField(
            model_name="ad",
            name="sold_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
