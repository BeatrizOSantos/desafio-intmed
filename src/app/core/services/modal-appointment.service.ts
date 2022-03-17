import {
  Especialidade,
  Medico,
  Data,
  Horario,
  AgendasDisponiveis,
  Consulta,
} from '../interfaces/consultas_d';
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

  public getMedicos(especialidade: Number): Observable<Medico[]> {
    return this.http.get<Medico[]>(
      environment['api'] + 'medicos/' + '?especialidade=' + especialidade
    );
  }

  getAgendasDisponiveis(medico: any, especialidade: any): Observable<any> {
    return this.http.get<ResponseEspecialidades>(
      environment['api'] +
        'agendas/' +
        '?medico=' +
        medico +
        '&especialidade=' +
        especialidade
    );
  }

  getAgenda(
    medico: Number,
    especialidade: Number,
    data: String
  ): Observable<any> {
    return this.http.get<ResponseEspecialidades>(
      environment['api'] +
        'agendas/' +
        medico +
        '.especialidade=' +
        especialidade +
        '&data_inicio=' +
        data +
        '&data_final=' +
        data
    );
  }

  public postCriarConsulta(consulta: any): Observable<any> {
    return this.http.post(environment['api'] + 'consultas/', consulta);
  }
}
