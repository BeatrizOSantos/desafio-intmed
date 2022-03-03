import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  hide = true;

  profileForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private register : RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
    });
  }

  addUser(){
    if(this.profileForm.valid){
      this.register.postUser(this.profileForm.value)
      .subscribe({
        next:(res)=>{
          alert("Usuário criado com sucesso");
          this.profileForm.reset();
          this.router.navigate(['/login']);
        },
        error:()=>{
          alert("Error ao criar o usuário");
        }
      })
    }
  }

}
