import { Especialidade, Medico, Data, Horario, AgendaDisponivel, Consulta } from './../features/modal-appointment/consultas_d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalAppointmentService {
  private readonly endpointEspecialidade = "http://localhost:3000/especialidades";
  private readonly endpointAgendaDisponivel = "http://localhost:3000/agendas-disponiveis";
  private readonly endpointMedico = "http://localhost:3000/medicos";
  private readonly endpointConsulta = "http://localhost:3000/consultas";

  constructor(private http : HttpClient) { }


  public getEspecialidade(){
    return this.http.get<Especialidade[]>(this.endpointEspecialidade);
  }

  public getAgendaDisponivel(){
    return this.http.get<AgendaDisponivel[]>(this.endpointAgendaDisponivel);
  }

  public getMedico(){
    return this.http.get<Medico[]>(this.endpointMedico);
  }

  public getDate(){
    return this.http.get<Data[]>(this.endpointAgendaDisponivel);
  }

  public getHorario(){
    return this.http.get<Horario[]>(this.endpointAgendaDisponivel);
  }

  public postConsulta(data : Consulta){
    return this.http.post<Consulta[]>(this.endpointConsulta, data);
  }

  public getConsulta(){
    return this.http.get<Consulta[]>(this.endpointConsulta);
  }

}
