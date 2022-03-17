import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  public getConsulta(): Observable<any> {
    return this.http.get<any>(environment['api'] + 'consultas/');
  }

  public deleteConsulta(id: any): Observable<any> {
    return this.http.delete<any>(environment['api'] + 'consultas/' + id, id);
  }
}
