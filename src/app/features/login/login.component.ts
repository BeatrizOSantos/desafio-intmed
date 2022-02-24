import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  //email
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  //senha
  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

}
