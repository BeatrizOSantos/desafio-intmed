import { MatDialogRef } from '@angular/material/dialog';
import { ModalAppointmentService } from './../../services/modal-appointment.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ListaEspecialidade, ListaData, ListaHorario, ListaMedico, Data, Horario, Medico, Especialidade } from './consultas_d';


@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
  styleUrls: ['./modal-appointment.component.sass']
})
export class ModalAppointmentComponent implements OnInit {
  selectedSpecialty: string;
  selectedDoctor: string;
  selectedData: string;
  selectedTime: string;

  // specialties: Especialidade[] = [];
  specialties: any;

  constructor(private formBuilder: FormBuilder, private modalAppointmentService : ModalAppointmentService, private MatDialogRef : MatDialogRef<ModalAppointmentComponent>) {
    this.selectedSpecialty = "";
    this.selectedDoctor = "";
    this.selectedData = "";
    this.selectedTime = "";
  }

  ngOnInit(): void {
  this.modalAppointmentService.getDoctor().subscribe((data)=>{
    this.specialties = data;
    console.log(data);
  });
  }

}
