import { Form, NgForm } from '@angular/forms';
import { AccountService } from './../shared/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  @ViewChild('form', { static: true }) form: NgForm;

  message: string;
  msgClass: string;

  account = {
    username: '',
    email: '',
    password1: '',
    password2: '',
  };

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      const result = await this.accountService.createAccount(this.account);
      this.message = 'O cadastro foi realizado com sucesso!';
      this.msgClass = 'alert success';
      console.log(result);
    } catch (error) {
      this.message = JSON.stringify(error.error);
      this.msgClass = 'alert danger';
      console.error(error);
    }
  }
}
