from django.db import models


class Historico(models.Model):

    class Meta:
        db_table = 'historico'

    data_calculo = models.DateTimeField()
    peso = models.IntegerField()
    carboidrato = models.IntegerField()
    tipo_alimento = models.CharField(max_length=100)
    alimento = models.CharField(max_length=200)
    usuario = models.CharField(max_length=50)

    def __str__(self):
        return self.alimento + ' - ' + self.usuario
