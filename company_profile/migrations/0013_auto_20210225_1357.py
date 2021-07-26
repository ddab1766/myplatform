# Generated by Django 3.0.4 on 2021-02-25 13:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20210224_1407'),
        ('company_profile', '0012_auto_20210224_1407'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sugub',
            name='cont_chg_gb',
            field=models.ForeignKey(blank=True, limit_choices_to={'code_topcd': None, 'comidx': 'AF'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cont_chg_gb', to='backend.ComCode', verbose_name='전환여부(AF)'),
        ),
        migrations.AlterField(
            model_name='sugub',
            name='work_type',
            field=models.ForeignKey(blank=True, limit_choices_to={'code_topcd': None, 'comidx': 'AG'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='work_type', to='backend.ComCode', verbose_name='근무형태(AG)'),
        ),
    ]