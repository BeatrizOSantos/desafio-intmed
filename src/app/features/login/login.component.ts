import { AuthService } from './../../core/auth/auth.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from 'src/app/core/interfaces/consultas_d';
import { User } from 'src/app/core/models/register.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  hide = true;

  isAuthenticate: boolean = false;
  showSpiner: boolean = false;

  tokenAuthorization: any;
  errorMessage: string = '';

  loginForm!: FormGroup;

  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {}

  user: User = {
    username: '',
    password: '',
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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(150),
        ],
      ],
    });
  }

  async submitLogin() {
    try {
      this.user.username = this.loginForm.get('username')?.value;
      this.user.password = this.loginForm.get('password')?.value;
      await this.loginService.login(this.user);
      sessionStorage.setItem('username', this.user.username);
      this.router.navigate(['']);
    } catch (error) {
      this.loginForm.reset();
      this.usernameInput.nativeElement.focus();
      this.passwordInput.nativeElement.focus();
      this.openSnackBarRed('Nome de usuário ou senha inválidos!', 'Fechar');
    }
  }

  getTokenAuthorization() {
    this.tokenAuthorization = localStorage.getItem('tokenUser');
    this.isAuthenticate = this.tokenAuthorization != null;
  }

  // loginSubmit() {
  //   this.loginService.login(this.loginForm.value).subscribe({
  //     next: (data: Token) => {
  //       if (data) {
  //         localStorage.setItem('tokenUser', data.token);
  //         localStorage.setItem('User', this.loginForm.value.username);
  //         this.getTokenAuthorization();
  //         this.router.navigate(['login/home']);
  //       }
  //     },
  //     error: () => {
  //       this.openSnackBar('Nome de usuário ou senha inválidos!', 'Fechar');
  //     },
  //   });
  //   this.showSpiner = true;
  // }

  // loginSubmit() {
  //   const username = this.loginForm.get('username')?.value;
  //   const password = this.loginForm.get('password')?.value;

  //   return this.authService.authenticate(username, password).subscribe({
  //     next: () => {
  //       this.router.navigate(['users', username]);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.loginForm.reset();
  //       this.usernameInput.nativeElement.focus();
  //       this.passwordInput.nativeElement.focus();
  //       this.openSnackBar('Nome de usuário ou senha inválidos!', 'Fechar');
  //     },
  //   });
  // }

  openSnackBarRed(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  // async onSubmit() {
  //   try {
  //     const result = await this.loginService.login(this.loginForm.value);
  //     window.sessionStorage.setItem(
  //       'username',
  //       this.loginForm.controls['username'].value
  //     );
  //     this.router.navigate(['']);
  //   } catch (error) {
  //     this.openSnackBar('Erro ao efetuar o login!', 'Fechar');
  //   }
  // }
}
