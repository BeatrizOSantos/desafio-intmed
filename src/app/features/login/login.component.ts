import { RegisterService } from 'src/app/core/services/register.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from 'src/app/core/interfaces/consultas_d';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private registerService: RegisterService,
    private _snackBar: MatSnackBar
  ) {}

  login: Login = {
    username: '',
    senha: '',
  };

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(150),
        ],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(150),
        ],
      ],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  async onSubmit() {
    try {
      const result = await this.loginService.login(this.loginForm.value);
      window.sessionStorage.setItem(
        'username',
        this.loginForm.controls['username'].value
      );
      this.router.navigate(['']);
    } catch (error) {
      this.openSnackBar('Erro ao efetuar o login!', 'Fechar');
    }
  }
}
