# Generated by Django 3.0.4 on 2021-04-23 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0022_auto_20210415_1227'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplicant',
            name='applied_birth',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='회원 생년월일'),
        ),
        migrations.AlterField(
            model_name='jobapplicant',
            name='applied_phone',
            field=models.CharField(blank=True, max_length=13, null=True, verbose_name='회원 연락처'),
        ),
    ]