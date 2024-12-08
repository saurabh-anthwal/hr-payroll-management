# Generated by Django 5.1.3 on 2024-12-09 06:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MonthlySalary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_date', models.DateField()),
                ('to_date', models.DateField()),
                ('paid_status', models.BooleanField(default=False)),
                ('paid_date', models.DateField(null=True)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.employee')),
            ],
            options={
                'db_table': 'monthly_salary',
            },
        ),
        migrations.CreateModel(
            name='Salary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ppa', models.FloatField()),
                ('monthly_salary', models.FloatField()),
                ('basic_da', models.FloatField()),
                ('hra', models.FloatField()),
                ('conveyance', models.FloatField()),
                ('pf', models.FloatField()),
                ('esic', models.FloatField()),
                ('professional_tax', models.FloatField()),
                ('net_salary', models.FloatField()),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.employee')),
            ],
            options={
                'db_table': 'salary',
            },
        ),
    ]
