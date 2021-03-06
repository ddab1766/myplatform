# Generated by Django 3.0.4 on 2021-02-01 17:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hr_profile', '0001_initial'),
        ('company_profile', '0003_remove_jobapplicant_hrprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplicant',
            name='hrprofile',
            field=models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to='hr_profile.HrProfile', verbose_name='HR회사'),
        ),
    ]
