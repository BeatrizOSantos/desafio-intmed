import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cadastro, Login } from '../interfaces/consultas_d';
import { LoginComponent } from '../../features/login/login.component';
import { lastValueFrom, Observable } from 'rxjs';
import { Token, User } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  token: any;
  // private readonly endpointLogin = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  login(login: User): Observable<Token> {
    return (this.token = this.http.post<Token>(
      environment['api'] + '/cadastro/login',
      login
    ));
  }

  // public getUser() {
  //   return this.http.get<Login[]>(this.endpointLogin);
  // }

  async doLogin(user: any) {
    const result = await lastValueFrom(
      this.http.post<Login>(environment['api'] + '/login', user)
    );
    if (result) {
      return true;
    }

    return false;
  }

  register(cadastro: Cadastro) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
