import { Component, Input } from '@angular/core';
import { Alimento } from './classes/alimento';
import { AccountService } from './account/shared/account.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'siscarb-app';
  message: string;
  msgClass: string;

  constructor(private accountService: AccountService, private datePipe: DatePipe, private router: Router) {

  }

  listItems: Alimento[] = [];

  get username(): string {
    return localStorage.getItem('username') || '';
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigate(['/home']);

  }
  salvarCalculos() {

    try {
      this.listItems.forEach(item => {
        let historico = {
          "data_calculo": this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm"),
          "peso": parseInt(item.weight),
          "carboidrato": parseInt(item.carb),
          "tipo_alimento": 'default',
          "alimento": item.item,
          "usuario": localStorage.getItem('username')
        }
        this.accountService.salvarHistorico(historico);
      });
      console.log('Calculos salvos com sucesso');
      this.message = 'Calculos salvos com sucesso';
      this.msgClass = 'alert success';
    } catch (error) {
      this.message = JSON.stringify(error.error);
      this.msgClass = 'alert danger';
      console.error(error);
    }



  }

  get totalCHO(): number {
    let total = 0;
    this.listItems.forEach(item => {
      total += parseInt(item.carb);
    });
    return total;
  }

}
