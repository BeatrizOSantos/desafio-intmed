import { Especialidade, Medico } from '../interfaces/consultas_d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseEspecialidades } from '../models/response-list.model';

@Injectable({
  providedIn: 'root',
})
export class ModalAppointmentService {
  constructor(private http: HttpClient) {}

  public getEspecialidades(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(
      environment['api'] + 'especialidades/'
    );
  }

  public getMedicos(idEspecialidade: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(
      environment['api'] + 'medicos/' + '?especialidade=' + idEspecialidade
    );
  }

  getAgendasDisponiveis(
    idMedico: string,
    idEspecialidade: string
  ): Observable<any> {
    return this.http.get<ResponseEspecialidades>(
      environment['api'] +
        'agendas/' +
        '?medico=' +
        idMedico +
        '&especialidade=' +
        idEspecialidade
    );
  }

  getAgenda(
    idMedico: string,
    idEspecialidade: string,
    data: string
  ): Observable<any> {
    return this.http.get<ResponseEspecialidades>(
      environment['api'] +
        `agendas/?medico=${idMedico}&especialidade=${idEspecialidade}&data_inicio=${data}&data_final=${data}`
    );
  }
}
