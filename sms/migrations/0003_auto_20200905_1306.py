# Generated by Django 3.0.4 on 2020-09-05 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0002_auto_20200903_1036'),
    ]

    operations = [
        migrations.CreateModel(
            name='InfoSms',
            fields=[
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('modified_time', models.DateTimeField(auto_now=True)),
                ('from_number', models.CharField(max_length=11, primary_key=True, serialize=False, verbose_name='발신번호')),
                ('to_number', models.CharField(max_length=11, verbose_name='수신번호')),
                ('contents', models.CharField(max_length=500, verbose_name='SMS내용')),
            ],
            options={
                'verbose_name_plural': 'Info문자 / InfoSms',
            },
        ),
        migrations.AlterModelOptions(
            name='authsms',
            options={'verbose_name_plural': '문자인증 / AuthSms'},
        ),
    ]
