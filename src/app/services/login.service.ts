import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../features/modal-appointment/consultas_d';
import { LoginComponent } from '../features/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly endpointLogin = "http://localhost:3000/login";

  constructor(private http : HttpClient) { }

  // login(){
  //   this.http.get<Login[]>(this.endpointLogin)
  //   .subscribe(res=>{
  //     const user = res.find((a : Login)=>{
  //       return a.email === this.loginForm.value.email && a.senha === this.loginForm.value.senha
  //     })
  //   })
  // }
}
