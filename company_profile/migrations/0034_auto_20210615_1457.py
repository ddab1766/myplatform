# Generated by Django 3.0.4 on 2021-06-15 05:57

import company_profile.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0033_auto_20210610_1345'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofile',
            name='company_image',
            field=models.ImageField(blank=True, null=True, upload_to=company_profile.models.company_directory_path, verbose_name='회사대표이미지'),
        ),
        migrations.AlterField(
            model_name='companyprofile',
            name='company_logo',
            field=models.ImageField(blank=True, null=True, upload_to=company_profile.models.company_directory_path, verbose_name='회사로고'),
        ),
    ]
