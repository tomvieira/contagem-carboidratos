# Generated by Django 4.2.7 on 2023-11-04 19:11

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Historico",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("data_calculo", models.DateField()),
                ("peso", models.IntegerField()),
                ("carboidrato", models.IntegerField()),
                ("tipo_alimento", models.CharField(max_length=100)),
                ("alimento", models.CharField(max_length=200)),
                ("usuario", models.CharField(max_length=50)),
            ],
            options={
                "db_table": "historico",
            },
        ),
    ]