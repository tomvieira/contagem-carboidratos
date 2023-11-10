from django.contrib import admin
from siscarb_app.models import Historico

# Register your models here.


class Historicos(admin.ModelAdmin):
    list_display = ('id', 'data_calculo', 'peso', 'carboidrato',
                    'tipo_alimento', 'alimento', 'usuario')
    list_display_links = ('id', 'usuario')
    search_fields = ('alimento', 'usuario')
    list_per_page = 20


admin.site.register(Historico, Historicos)
