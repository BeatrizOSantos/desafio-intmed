import { HomeService } from './../../services/home.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAppointmentService } from './../../services/modal-appointment.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Data, Horario, Medico, Especialidade, AgendaDisponivel } from './consultas_d';

@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
  styleUrls: ['./modal-appointment.component.sass']
})
export class ModalAppointmentComponent implements OnInit {
  modalForm !: FormGroup;

  especialidades!: Especialidade[];
  medicos!: Medico[];
  datas!: Data[];
  horarios!: Horario[];
  agendaDisponivel!: AgendaDisponivel[];

  constructor(private formBuilder: FormBuilder, private modalService : ModalAppointmentService, private dialogRef : MatDialogRef<ModalAppointmentComponent>, private homeService : HomeService) { }

  ngOnInit(): void {
    this.modalService.getEspecialidade().subscribe((dados) => {
      this.especialidades = dados
    });

    this.modalService.getMedico().subscribe((dados) => {
      this.medicos = dados
    });

    this.modalService.getDate().subscribe((dados) => {
      this.datas = dados
    });

    this.modalService.getHorario().subscribe((dados) => {
      this.horarios = dados
    });

    this.modalForm = this.formBuilder.group({
      especialidade: ['', Validators.required],
      medico: ['', Validators.required],
      dia: ['', Validators.required],
      horario: ['', Validators.required],
    });

  }

  submitForm(){
    if(this.modalForm.valid){
      this.modalService.postConsulta(this.modalForm.value)
      .subscribe({
        next:(res)=>{
          alert("Consulta agendada");
          this.modalForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error ao agendar consulta")
        }
      })
    }
  }

}
