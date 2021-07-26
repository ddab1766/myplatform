# Generated by Django 3.0.4 on 2021-05-04 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0005_delete_infosms'),
    ]

    operations = [
        migrations.CreateModel(
            name='InfoSms',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('modified_time', models.DateTimeField(auto_now=True)),
                ('from_number', models.CharField(max_length=11, verbose_name='발신번호')),
                ('to_number', models.CharField(max_length=11, verbose_name='수신번호')),
                ('contents', models.CharField(max_length=500, verbose_name='SMS내용')),
            ],
            options={
                'verbose_name_plural': 'Info문자 / InfoSms',
            },
        ),
    ]
