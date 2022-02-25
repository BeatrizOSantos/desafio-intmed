import { Component, OnInit } from '@angular/core';

interface Especialidade {
  value: string;
  viewValue: string;
}

interface Medico {
  value: string;
  viewValue: string;
}

interface Data {
  value: string;
  viewValue: string;
}

interface Hora {
  value: string;
  viewValue: string;
}

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

  specialties: Especialidade[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  doctors: Medico[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];

  datas: Data[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];

  time: Hora[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];

  constructor() {
    this.selectedSpecialty = "";
    this.selectedDoctor = "";
    this.selectedData = "";
    this.selectedTime = "";
  }

  ngOnInit(): void {
  }

}
