# Generated by Django 3.2 on 2021-04-26 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sname', models.CharField(max_length=30, unique=True)),
                ('spwd', models.CharField(max_length=30)),
            ],
        ),
    ]
