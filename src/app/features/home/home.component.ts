import { ModalAppointmentService } from '../../core/services/modal-appointment.service';
import { FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Consulta } from '../../core/interfaces/consultas_d';
import { ModalAppointmentComponent } from '../modal-appointment/modal-appointment.component';

const CONSULTA_DATA: Consulta[] = [
  // {specialty: 'Cardiologia', professional: 'Dr. Drauzio Varella', data: '10/02/2020', hour: '13:00'},
  // {specialty: 'Neurologia', professional: 'Dr. Gregory House', data: '10/02/2020', hour: '13:00'},
  // {specialty: 'Geral', professional: 'Dr. Paulo Carvalho', data: '11/02/2020', hour: '13:00'},
  // {specialty: 'Cardiologia', professional: 'Dr. Nathascha Timbó', data: '12/02/2020', hour: '13:00'},
  // {specialty: 'Pediatria', professional: 'Dr. Marcos Mioto', data: '13/02/2020', hour: '13:00'},
  // {specialty: 'Geral', professional: 'Dr. Cristina Valente', data: '12/02/2020', hour: '13:00'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  homeForm!: FormGroup;

  responseConsultas!: Consulta[];

  displayedColumns: string[] = ['especialidade', 'medico', 'data', 'hora', 'delete'];
  dataSource = CONSULTA_DATA;

  constructor(public dialog: MatDialog, private modalService : ModalAppointmentService, private homeService : HomeService) { }

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


  // getAllConsultas(){
  //   if(this.modalForm.valid){
  //     this.modalService.getConsulta()
  //     .subscribe({
  //       next:(res)=>{
  //         console.log(res);
  //       },
  //       error:()=>{
  //         alert("Error while fetching the Records")
  //       }
  //     })
  //   }
  // }

}
