import { ModalAppointmentService } from '../../core/services/modal-appointment.service';
import { FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Consulta } from '../../core/interfaces/consultas_d';
import { ModalAppointmentComponent } from '../modal-appointment/modal-appointment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  homeForm!: FormGroup;

  responseConsultas!: Consulta[];

  displayedColumns: string[] = ['especialidade', 'medico', 'data', 'hora', 'delete'];

  constructor(public dialog: MatDialog, private router : Router, private modalService : ModalAppointmentService, private homeService : HomeService) { }

  ngOnInit(): void {
    this.AllConsultas();
  }

  openDialog() {
    this.dialog.open(ModalAppointmentComponent);
  }

  AllConsultas(){
    this.homeService.getConsulta().subscribe( (consultas) => {
      this.responseConsultas = consultas;
      console.log(this.responseConsultas);
    });
  }

  public get username(){
    return window.sessionStorage.getItem("username");
  }

  public logout(){
    window.sessionStorage.removeItem("username");
    this.router.navigate(['/login']);
  }

}
