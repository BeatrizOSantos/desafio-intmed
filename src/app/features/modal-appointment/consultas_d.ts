export interface ListaEspecialidade {
  especialidades: Especialidade[];
}

export interface ListaMedico {
  medicos: Medico[];
}

export interface ListaData {
  datas: Data[];
}

export interface ListaHorario {
  horarios: Horario[];
}

export interface Medico {
  id: number;
  nome: string;
  crm: number;
}

export interface Data {
  data: string;
  id: number;
}

export interface Horario {
  horario: string;
  id: number;
}

export interface Especialidade {
  name: string;
  id: number;
}
