# Generated by Django 4.1.7 on 2023-03-01 06:41

import HousingApp.models
from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=32)),
                ('desc', models.CharField(max_length=120)),
                ('properties_list', djongo.models.fields.EmbeddedField(model_container=HousingApp.models.Collection_Object)),
            ],
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=32)),
                ('cost', models.CharField(max_length=20)),
                ('address', djongo.models.fields.EmbeddedField(model_container=HousingApp.models.Address)),
                ('latitude', models.DecimalField(decimal_places=15, max_digits=20)),
                ('longitude', models.DecimalField(decimal_places=15, max_digits=20)),
                ('num_bedrooms', models.PositiveIntegerField()),
                ('num_bathrooms', models.PositiveIntegerField()),
                ('desc', models.CharField(max_length=1000)),
                ('contact_info', djongo.models.fields.EmbeddedField(model_container=HousingApp.models.Social_Info)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('display_name', models.CharField(max_length=32)),
                ('is_profile_displayed', models.BooleanField()),
                ('profile_info', djongo.models.fields.EmbeddedField(model_container=HousingApp.models.Profile_Info)),
                ('social_info', djongo.models.fields.EmbeddedField(model_container=HousingApp.models.Social_Info)),
                ('friends', djongo.models.fields.ArrayField(model_container=HousingApp.models.Friend, null=True)),
                ('collections', djongo.models.fields.ArrayField(blank=True, model_container=HousingApp.models.Collection)),
            ],
        ),
    ]
