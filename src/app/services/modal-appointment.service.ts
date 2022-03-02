import { ListaEspecialidade } from './../features/modal-appointment/consultas_d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalAppointmentService {
  public responseEspecialidade = new BehaviorSubject(null);

  constructor(private http : HttpClient) { }

  public getDoctor(){
    const endpoint = "http://localhost:3000/especialidades";

    return this.http.get<ListaEspecialidade>(endpoint);
  }

}
