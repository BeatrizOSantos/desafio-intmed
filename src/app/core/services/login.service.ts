import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cadastro, Login } from '../interfaces/consultas_d';
import { LoginComponent } from '../../features/login/login.component';
import { first, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { User } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  async login(login: User) {
    const result = await firstValueFrom(
      this.http.post<any>(environment['api'] + 'users/login/', login)
    );
    if (result) {
      window.sessionStorage.setItem('token', JSON.stringify(result.token));
    }
  }

  // public getUser() {
  //   return this.http.get<Login[]>(this.endpointLogin);
  // }

  // async doLogin(user: any) {
  //   const result = await lastValueFrom(
  //     this.http.post<Login>(environment['api'] + '/login/', user)
  //   );
  //   if (result) {
  //     return true;
  //   }

  //   return false;
  // }

  // register(cadastro: Cadastro) {
  //   return new Promise((resolve) => {
  //     resolve(true);
  //   });
  // }

  public logout() {
    localStorage.removeItem('token');
  }
}
