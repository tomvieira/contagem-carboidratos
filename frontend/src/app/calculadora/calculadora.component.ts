import { Component, Input } from '@angular/core';
import { CalculadoraService } from './services/calculadora.service';
import { TipoAlimento } from '../classes/tipo-alimento';
import { Alimento } from '../classes/alimento';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {

  public tipoAlimentoSel: TipoAlimento;
  public alimentoSel: Alimento;
  public alimentos: Alimento[];
  public cho: number = 0;
  public weightSel: number = 0;
  public totalCarb: number = 0;


  constructor(private calculadoraService: CalculadoraService, public myapp: AppComponent) {
    this.tipoAlimentoSel = new TipoAlimento('', '');
    this.alimentoSel = new Alimento('', '', '', '');
    this.alimentos = [];
  }

  limparCalculo() {
    this.cho = 0;
    this.weightSel = 0;
    this.totalCarb = 0;
  }

  ngOnInit() {
  }

  get tipoAlimentos(): TipoAlimento[] {
    return this.calculadoraService.getTipoAlimentos();
  }

  loadAlimentos(): Alimento[] {
    this.limparCalculo();
    if (this.tipoAlimentoSel.id != '') {
      this.alimentos = this.calculadoraService.getAlimentos(this.tipoAlimentoSel);
      return this.alimentos;
    }
    return [];
  }

  selecionarAlimento() {
    this.weightSel = parseFloat(this.alimentoSel.weight);
    this.totalCarb = parseFloat(this.alimentoSel.carb);
  }

  calcularCHO() {
    let carb = parseFloat(this.alimentoSel.carb);
    let weight = parseFloat(this.alimentoSel.weight);
    let result = (this.weightSel * carb) / weight;
    return Math.ceil(result);
  }

  get totalCHO(): number {
    if (this.alimentoSel.carb != '') {
      return this.calcularCHO()
    }
    return 0;
  }

  addListaAlimentos() {
    if (this.alimentoSel.item !== '') {
      this.myapp.listItems.push(this.alimentoSel);
    }
  }


}
