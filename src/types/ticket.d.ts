interface Ticket {
  id: number
  idTicket: number
  titulo: string
  descricao: string
  dataCriacao: number
  dataFechamento: any
  dataAtualizacao: number
  coordenacao: Coordenacao
  funcionario: Funcionario
  aluno: Aluno
  status: Status
  prioridade: Prioridade
  categoria: Categoria
}

interface TicketForm {
  ticketInput: TicketInput
  file: string
}

interface TicketInput {
  titulo: string
  descricao: string
  idCoordenacao: number
  idFuncionario: number
  idAluno: number
  idStatus: number
  idPrioridade: number
  idCategoria: number
}

