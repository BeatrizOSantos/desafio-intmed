import { ModalAppointmentService } from '../../core/services/modal-appointment.service';
import { FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Consulta } from '../../core/interfaces/consultas_d';
import { ModalAppointmentComponent } from '../modal-appointment/modal-appointment.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  homeForm!: FormGroup;

  user: any;

  responseConsultas!: Consulta[];

  displayedColumns: string[] = [
    'especialidade',
    'medico',
    'data',
    'hora',
    'delete',
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private modalService: ModalAppointmentService,
    private homeService: HomeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.AllConsultas();
    this.user = localStorage.getItem('User');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  openDialog() {
    this.dialog.open(ModalAppointmentComponent);
  }

  AllConsultas() {
    this.homeService.getConsulta().subscribe((consultas) => {
      this.responseConsultas = consultas;
      // this.responseConsultas = consultas.results;
    });
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('User');
    this.router.navigate(['/login']);
  }

  // public get username() {
  //   return window.sessionStorage.getItem('username');
  // }

  // public logout() {
  //   window.sessionStorage.removeItem('username');
  //   this.router.navigate(['/login']);
  // }

  deleteConsulta(id: any) {
    this.homeService.deleteConsulta(id).subscribe(() => {
      this.openSnackBar('Consulta deletada!', 'Fechar');
      window.location.reload();
    });
  }
}
