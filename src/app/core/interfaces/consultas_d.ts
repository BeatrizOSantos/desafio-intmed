export interface AgendasDisponiveis {
  id: number;
  medico: Medico;
  dia: string;
  horarios: Horario;
}

export interface Medico {
  id: number;
  crm: number;
  nome: string;
  especialidade: Especialidade;
}

export interface Data {
  dia: string;
}

export interface Horario {
  horarios: [];
}

export interface Especialidade {
  id: number;
  nome: string;
}

export interface Cadastro {
  id: number;
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface Consulta {
  id: number;
  dia: string;
  horario: string;
  data_agendamento: string;
  medico: Medico;
}

export interface Login {
  username: string;
  senha: string;
}
