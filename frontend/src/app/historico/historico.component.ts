import { Component } from '@angular/core';
import { Alimento } from '../classes/alimento';
import { Historico } from '../classes/historico';
import { AccountService } from '../account/shared/account.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {



  listItems: Historico[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.listItems = this.accountService.getHistorico(localStorage.getItem('username'));
    console.log(this.listItems);
    console.log('passei aqui')
  }

}
