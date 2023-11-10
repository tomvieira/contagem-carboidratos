from rest_framework import serializers
from siscarb_app.models import Historico


class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        fields = '__all__'
