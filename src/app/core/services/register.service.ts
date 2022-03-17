import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cadastro } from '../interfaces/consultas_d';
import { User } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // private readonly endpointCadastro = 'http://localhost:3000/cadastro/';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(environment['api'] + 'users', user);
  }

  // public addUser(user: User): Observable<User> {
  //   return this.http.post<User>(environment['api'] + '/cadastro/', user);
  // }
}
