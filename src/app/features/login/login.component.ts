import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Cadastro, Login } from '../modal-appointment/consultas_d';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  hide = true;

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router : Router, private loginService : LoginService) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  login(){
    this.http.get<Login[]>("http://localhost:3000/cadastro")
    .subscribe(res=>{
      const user = res.find((a : Login)=>{
        return a.email === this.loginForm.value.email && a.senha === this.loginForm.value.senha
      });
      if(user){
        alert("Login efetuado com sucesso");
        this.loginForm.reset();
        this.router.navigate(['home']);
      } else {
        alert("Usuário não encontrado");
      }
    },(err)=>{
      alert("Error ao efetuar login")
    })
  }

}
