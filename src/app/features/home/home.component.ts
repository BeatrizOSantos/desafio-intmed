import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/core/services/consulta.service';
import { FormGroup } from '@angular/forms';
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
    private _snackBar: MatSnackBar,
    private consultaService: ConsultaService
  ) {}

  ngOnInit(): void {
    this.AllConsultas();
    this.getUsername();
  }

  openSnackBarGreen(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      panelClass: 'green',
    });
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAppointmentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.AllConsultas();
    });
  }

  AllConsultas() {
    this.consultaService.getConsulta().subscribe((consultas) => {
      this.responseConsultas = consultas;
    });
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  deleteConsulta(id: any) {
    this.consultaService.deleteConsulta(id).subscribe(() => {
      this.openSnackBarGreen('Consulta deletada!', 'Fechar');
      this.AllConsultas();
    });
  }
}
