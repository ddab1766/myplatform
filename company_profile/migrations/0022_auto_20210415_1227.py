# Generated by Django 3.0.4 on 2021-04-15 12:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('company_profile', '0021_estimate_comments'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sugub',
            name='jikname',
        ),
        migrations.AddField(
            model_name='sugub',
            name='etc',
            field=models.TextField(blank=True, max_length=2000, null=True, verbose_name='기타 특이사항'),
        ),
        migrations.AlterField(
            model_name='sugub',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_sugub', to=settings.AUTH_USER_MODEL, verbose_name='의뢰자'),
        ),
    ]
