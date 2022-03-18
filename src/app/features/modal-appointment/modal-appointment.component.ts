import { Medico } from './../../core/models/medico.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAppointmentService } from '../../core/services/modal-appointment.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaService } from 'src/app/core/services/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Especialidade } from 'src/app/core/models/especialidade.model';

@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
  styleUrls: ['./modal-appointment.component.sass'],
})
export class ModalAppointmentComponent implements OnInit {
  criarConsultaForm!: FormGroup;

  especialidades!: Especialidade[];
  medicos!: Medico[];
  horarios!: string[];
  agendasDisponiveis!: any[];

  idEspecialidade!: string;
  idMedico!: string;
  idAgenda!: string;

  diaConsulta!: string;
  horaConsulta!: string;

  respostaConsulta!: string[];

  showErrorMedico: boolean = false;
  showErrorDia: boolean = false;
  showErrorHora: boolean = false;

  requiredPostCreateConsulta = {
    agenda_id: 0,
    horario: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalAppointmentService,
    private dialogRef: MatDialogRef<ModalAppointmentComponent>,
    private consultaService: ConsultaService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.criarConsultaForm = this.formBuilder.group({
      especialidade: [null, Validators.required],
      medico: [null, Validators.required],
      agenda: [null, Validators.required],
      hora: [null, Validators.required],
    });

    this.getEspecialidades();
  }

  openSnackBarRed(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'red',
      verticalPosition: 'top',
    });
  }

  openSnackBarGreen(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      panelClass: 'green',
    });
  }

  getEspecialidades() {
    this.modalService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
    });
  }

  getMedicos() {
    this.showErrorMedico = false;
    this.showErrorDia = false;

    this.idEspecialidade = this.criarConsultaForm.value.especialidade;
    if (this.idEspecialidade != null) {
      this.modalService.getMedicos(this.idEspecialidade).subscribe((data) => {
        this.medicos = data;
      });
      this.idMedico = this.criarConsultaForm.value.medico;
    } else {
      this.showErrorMedico = true;
      this.openSnackBarRed('Selecione primeiro a especialidade!', 'Fechar');
    }
  }

  getAgendasDisponiveis() {
    this.showErrorHora = false;

    if (this.idMedico != null && this.idEspecialidade != null) {
      this.modalService
        .getAgendasDisponiveis(this.idMedico, this.idEspecialidade)
        .subscribe((data) => {
          this.agendasDisponiveis = data;
        });
      this.diaConsulta = this.criarConsultaForm.value.agenda;
    } else {
      this.showErrorDia = true;
      this.openSnackBarRed('Selecione primeiro o medico!', 'Fechar');
    }
  }

  getHora() {
    if (
      this.idMedico != null &&
      this.idEspecialidade != null &&
      this.diaConsulta != null
    ) {
      this.modalService
        .getAgenda(this.idMedico, this.idEspecialidade, this.diaConsulta)
        .subscribe((data) => {
          this.horarios = data[0].horarios;
          this.requiredPostCreateConsulta.agenda_id = data[0].id;
        });
    } else {
      this.showErrorHora = true;
      this.openSnackBarRed('Selecione primeiro a data!', 'Fechar');
    }
  }

  submitForm() {
    try {
      this.requiredPostCreateConsulta.horario =
        this.criarConsultaForm.value.hora;
      this.consultaService
        .postCriarConsulta(this.requiredPostCreateConsulta)
        .subscribe({
          next: () => {
            this.openSnackBarGreen('Consulta Marcada!', 'Fechar');
            this.dialogRef.close();
            this.criarConsultaForm.reset();
          },
          error: () => {
            this.openSnackBarRed('Erro!', 'Fechar');
          },
          complete: () => {},
        });
    } catch (error) {}
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
