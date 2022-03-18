import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  openSnackBarRed(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'red',
      verticalPosition: 'top',
    });
  }
}
