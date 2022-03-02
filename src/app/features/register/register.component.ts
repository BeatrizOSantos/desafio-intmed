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
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  addProduct(){
    if(this.profileForm.valid){
      this.register.postUser(this.profileForm.value)
      .subscribe({
        next:(res)=>{
          alert("User added successfully");
          this.router.navigate(['/login']);
        },
        error:()=>{
          alert("Error while adding the user");
        }
      })
    }
  }

}
