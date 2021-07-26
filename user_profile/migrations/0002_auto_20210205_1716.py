# Generated by Django 3.0.4 on 2021-02-05 17:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hr_profile', '0004_auto_20210205_1716'),
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resume',
            name='hrprofile',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hrprofile_resume', to='hr_profile.HrProfile', verbose_name='등록한회사'),
        ),
    ]