import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  constructor(private http: HttpClient) {}

  public postCriarConsulta(consulta: any): Observable<any> {
    return this.http.post(environment['api'] + 'consultas/', consulta);
  }
  public getConsulta(): Observable<any> {
    return this.http.get<any>(environment['api'] + 'consultas/');
  }

  public deleteConsulta(id: any): Observable<any> {
    return this.http.delete<any>(environment['api'] + 'consultas/' + id, id);
  }
}
