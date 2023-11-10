from rest_framework import viewsets
from siscarb_app.models import Historico
from siscarb_app.serializer import HistoricoSerializer
from django_filters.rest_framework import DjangoFilterBackend


class HistoricoViewSet(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['usuario', 'alimento', 'tipo_alimento', 'data_calculo']
