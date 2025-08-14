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

interface TicketUpdate {
  titulo: string
  descricao: string
  idCoordenacao: number
  idFuncionario: number
  idAluno: number
  idStatus: number
  idPrioridade: number
  idCategoria: number
}

interface TicketPatchUpdate {
  titulo?: string
  descricao?: string
  idCoordenacao?: number
  idFuncionario?: number
  idAluno?: number
  idStatus?: number
  idPrioridade?: number
  idCategoria?: number
}

interface TicketCreate {
  titulo: string
  descricao: string
  idCoordenacao: number
  idAluno: number
  idStatus: number
  idPrioridade: number
  idCategoria: number
}

interface TicketDashboard {
  totalTickets: number
  totalTicketsResolvidos: number
  totalTicketsAbertos: number
  totalTicketsPendentes: number
  totalTicketsEmAndamento: number
  porcentagemProgresso: number
  porcentagemAbertos: number
  porcentagemResolvidos: number
  porcentagemAndamento: number
}

interface TicketStatsMes {
  mes: number
  total: number
}

interface TicketMovimentacao {
  idMovimentacao: number
  usuarioOrigem: User
  usuarioDestino: User | null
  tipo: TipoMovimentacao
  dataMovimentacao: string
}

interface UsuarioMovimentacao {
  idUsuario: number
  nome: string
  email?: string
  role: Role
}

type TipoMovimentacao = "CAPTURAR" | "DELEGAR" | "FINALIZAR" | "ATUALIZAR_STATUS" | "ATUALIZAR";
