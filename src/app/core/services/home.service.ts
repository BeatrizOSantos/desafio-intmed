import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../interfaces/consultas_d';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly endpointConsulta = "http://localhost:3000/consultas";

  constructor(private http : HttpClient) { }

  public postConsulta(data : Consulta){
    return this.http.post<Consulta[]>(this.endpointConsulta, data);
  }

  public getConsulta(){
    return this.http.get<Consulta[]>(this.endpointConsulta);
  }
}
