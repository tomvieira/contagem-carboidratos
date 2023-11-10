import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('form', { static: true }) form: NgForm;

  message: string;
  msgClass: string;

  login = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      console.log(this.login);
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado: ${result}`);

      // navego para a rota vazia novamente
      this.router.navigate(['/home']);
    } catch (error) {
      this.message = JSON.stringify(error.error);
      this.msgClass = 'alert danger';
      console.error(error);
    }
  }
}
