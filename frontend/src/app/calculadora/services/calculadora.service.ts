import { Injectable } from '@angular/core';
import { TipoAlimento } from 'src/app/classes/tipo-alimento';
import { HttpClient } from '@angular/common/http';
import { Alimento } from 'src/app/classes/alimento';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {


  constructor(private http: HttpClient) { }

  getTipoAlimentos() {
    return [new TipoAlimento('tb1', 'Alimentos'),
    new TipoAlimento('tb2', 'Cantina Escolar'),
    new TipoAlimento('tb3', 'Cantina Italiana'),
    new TipoAlimento('tb4', 'Casamento'),
    new TipoAlimento('tb5', 'Churrascaria'),
    new TipoAlimento('tb6', 'Comida Árabe'),
    new TipoAlimento('tb7', 'Comida Japonesa'),
    new TipoAlimento('tb8', 'Culinária Alemã'),
    new TipoAlimento('tb9', 'Doces'),
    new TipoAlimento('tb10', 'Festa de Aniversário'),
    new TipoAlimento('tb11', 'Festa Junina'),
    new TipoAlimento('tb12', 'Natal'),
    new TipoAlimento('tb13', 'Páscoa'),
    new TipoAlimento('tb14', 'Pizzas'),
    new TipoAlimento('tb15', 'Sorvetes')

    ];
  }

  getAlimentos(tipoAlimentoSel: TipoAlimento): Alimento[] {
    // Atribui uma variável para o arquivo CSV
    console.log(tipoAlimentoSel.id);
    let csvFilePath = '';
    // Determina o acesso ao caminho do arquivo CSV dependendo da opção selecionada
    switch (tipoAlimentoSel.id) {
      case 'tb1': // Tabela padrão
        csvFilePath = './assets/res/tabela_de_alimentos.csv';
        break;
      case 'tb2': // Cantina escolar
        csvFilePath = './assets/res/tabela_cantina_escolar.csv';
        break;
      case 'tb3': // Cantina italiana
        csvFilePath = './assets/res/tabela_cantina_italiana.csv';
        break;
      case 'tb4': // Casamento
        csvFilePath = './assets/res/tabela_casamento.csv';
        break;
      case 'tb5': // Churrascaria
        csvFilePath = './assets/res/tabela_churrascaria.csv';
        break;
      case 'tb6': // Comida árabe
        csvFilePath = './assets/res/tabela_comida_arabe.csv';
        break;
      case 'tb7': // Comida japonesa
        csvFilePath = './assets/res/tabela_comida_japonesa.csv';
        break;
      case 'tb8': // Culinária alemã
        csvFilePath = './assets/res/tabela_culinaria_alema.csv';
        break;
      case 'tb9': // Doces
        csvFilePath = './assets/res/tabela_doces.csv';
        break;
      case 'tb10': // Festa de aniversário
        csvFilePath = './assets/res/tabela_festa_aniversario.csv';
        break;
      case 'tb11': // Festa junina
        csvFilePath = './assets/res/tabela_festa_junina.csv';
        break;
      case 'tb12': // Natal
        csvFilePath = './assets/res/tabela_natal.csv';
        break;
      case 'tb13': // Páscoa
        csvFilePath = './assets/res/tabela_pascoa.csv';
        break;
      case 'tb14': // Pizza
        csvFilePath = './assets/res/tabela_pizzas.csv';
        break;
      case 'tb15': // Sorvetes
        csvFilePath = './assets/res/tabela_sorvetes.csv';
        break;
      default:
        console.log('Opção desconhecida selecionada.');
    }
    let dataArray: Alimento[] = [];
    this.http.get(csvFilePath, { responseType: 'text' }).subscribe(data => {
      const lines = data.split('\n');
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const items = this.parseCSVLine(line);

        // Se houver um item
        if (items.length > 0) {
          // nome do item
          const item = items[0];
          // medida usual
          const measure = items[1];
          // peso
          const weight = items[2];
          // CHO
          const carb = items[3];
          // Armazena as informações na array
          dataArray.push(new Alimento(item, measure, weight, carb));
        }
      }

    });
    return dataArray;
  }

  parseCSVLine(line: string) {
    const items = [];
    let currentItem = '';
    let withinQuotes = false;

    for (const char of line) {
      if (char === ',' && !withinQuotes) {
        items.push(currentItem.trim());
        currentItem = '';
      } else if (char === '"') {
        withinQuotes = !withinQuotes;
      } else {
        currentItem += char;
      }
    }
    items.push(currentItem.trim());
    return items;
  }
}
