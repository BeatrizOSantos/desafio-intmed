import { HomeService } from '../../core/services/home.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAppointmentService } from '../../core/services/modal-appointment.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Data,
  Horario,
  Medico,
  AgendasDisponiveis,
  // Especialidade,
} from '../../core/interfaces/consultas_d';
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
  horarios!: any[];
  agendasDisponiveis!: any[];

  agendaConsulta: any;

  idEspecialidade!: any;
  idMedico!: any;
  idAgenda!: any;

  diaConsulta!: any;
  horaConsulta!: any;

  respostaConsulta!: any[];

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
    private homeService: HomeService,
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  getEspecialidades() {
    this.modalService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
      // this.getMedicos();
      console.log(data);
    });
  }

  getMedicos() {
    this.showErrorMedico = false;
    this.showErrorDia = false;

    this.idEspecialidade = this.criarConsultaForm.value.especialidade;
    if (this.idEspecialidade != null) {
      console.log(this.idEspecialidade);
      this.modalService.getMedicos(this.idEspecialidade).subscribe((data) => {
        this.medicos = data;
        console.log(data);
      });
      this.idMedico = this.criarConsultaForm.value.medico;
    } else {
      this.showErrorMedico = true;
      // this.openSnackBar('Selecione primeiro a especialidade!', 'Fechar');
    }
  }

  getAgendasDisponiveis() {
    console.log('entrou');
    this.showErrorHora = false;

    try {
      console.log('entrou2');
      this.modalService
        .getAgendasDisponiveis(this.idMedico, this.idEspecialidade)
        .subscribe((data) => {
          this.agendasDisponiveis = data;
          console.log(data);
        });
      this.diaConsulta = this.criarConsultaForm.value.agenda;
    } catch (error) {
      this.showErrorDia = true;
      // this.openSnackBar('Selecione primeiro o medico!', 'Fechar');
    }
  }

  getHora() {
    console.log('entrouhora');
    try {
      console.log('entrouhora2');
      this.modalService
        .getAgenda(this.idMedico, this.idEspecialidade, this.diaConsulta)
        .subscribe((data) => {
          console.log('data: ', data);
          // this.respostaConsulta = data;
          // this.agendaConsulta = JSON.stringify(this.respostaConsulta);
          // this.agendaConsulta = JSON.parse(this.agendaConsulta);
          this.horarios = data[0].horarios;
          console.log('data id:', data[0].id);
          this.requiredPostCreateConsulta.agenda_id = data[0].id;
        });
    } catch (error) {
      this.showErrorHora = true;
      // this.openSnackBar('Selecione primeiro a data!', 'Fechar');
    }
  }

  submitForm() {
    try {
      this.requiredPostCreateConsulta.horario =
        this.criarConsultaForm.value.hora;
      console.log(this.requiredPostCreateConsulta);
      this.modalService
        .postCriarConsulta(this.requiredPostCreateConsulta)
        .subscribe({
          next: () => {
            this.openSnackBar('Consulta Marcada!', 'Fechar');
            this.dialogRef.close();
            this.criarConsultaForm.reset();
          },
          error: () => {
            this.openSnackBar('Erro!', 'Fechar');
          },
          complete: () => {},
        });
    } catch (error) {}
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
