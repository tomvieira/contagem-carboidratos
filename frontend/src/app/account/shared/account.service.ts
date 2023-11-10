import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Historico } from 'src/app/classes/historico';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: any) {
    const result = await this.http.post<any>(`${environment.api}/auth/login/`, user).toPromise();
    console.log(result);
    if (result && result.key) {
      window.localStorage.setItem('token', result.key);
      this.getUsername(result.key);
      return true;
    }

    return false;
  }

  async salvarHistorico(historico: any) {
    const result = await this.http.post<any>(`${environment.api}/historicos/`, historico).toPromise();
    console.log(result);
    if (result && result.key) {
      return true;
    }

    return false;
  }

  getHistorico(username: string): Historico[] {
    let historico: Historico[] = [];
    this.http.get<any>(`${environment.api}/historicos/?usuario=${username}`)
      .subscribe((data: any) => {
        data.forEach((item: any) => {
          historico.push(new Historico(item.id, item.data_calculo, item.peso, item.carboidrato, item.tipo_alimento, item.alimento, item.usuario));
        });
      });
    return historico;

  }

  async getUsername(token: string) {
    const result = await this.http.get<any>(`${environment.api}/auth/user/`,
      {
        headers: { 'Authorization': "Token " + token }
      }).toPromise();
    if (result) {
      window.localStorage.setItem('username', result.username);

    }

  }

  async createAccount(account: any) {
    const result = await this.http.post<any>(`${environment.api}/auth/registration/`, account).toPromise();
    return result;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwtDecode(token);

    if (decoded.exp === undefined) {
      return new Date(0);
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
