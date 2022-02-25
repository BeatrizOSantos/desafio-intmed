import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAppointmentComponent } from '../modal-appointment/modal-appointment.component';

export interface NewAppointment {
  specialty: string;
  professional: string;
  data: string;
  hour: string;
}

const APPOINTMENT_DATA: NewAppointment[] = [
  {specialty: 'Cardiologia', professional: 'Dr. Caio Carlos Ferreira', data: '01/01/2020', hour: '13:00'},
  {specialty: 'Cardiologia', professional: 'Dr. Caio Carlos Ferreira', data: '01/01/2020', hour: '13:00'},
  {specialty: 'Cardiologia', professional: 'Dr. Caio Carlos Ferreira', data: '01/01/2020', hour: '13:00'},
  {specialty: 'Cardiologia', professional: 'Dr. Caio Carlos Ferreira', data: '01/01/2020', hour: '13:00'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['specialty', 'professional', 'data', 'hour', 'actions'];
  dataSource = APPOINTMENT_DATA;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(ModalAppointmentComponent);
  }

  ngOnInit(): void {
  }

}
