import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cadastro } from '../interfaces/consultas_d';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly endpointCadastro = "http://localhost:3000/cadastro/";

  constructor(private http : HttpClient) { }

  public postUser(data : Cadastro){
    return this.http.post<Cadastro[]>(this.endpointCadastro, data);
  }

  public getUser(){
    return this.http.get<Cadastro[]>(this.endpointCadastro);
  }

}
