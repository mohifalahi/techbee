# Generated by Django 2.1.5 on 2019-12-21 09:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_delete_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='device_type',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
    ]
