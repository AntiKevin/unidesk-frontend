import api from "@/lib/axios";

/**
 * Essa função é para mapear o ticket retornado pela API para o tipo Ticket
 * criada principalmente para garantir que o id seja tipado sem o '@id'
 */
const mapTicketId = (ticket: any): Ticket => {
  const convertedTicket = {
    id: ticket['@id'],
    ...ticket,
  };
  return convertedTicket;
};

/**
 * Serviço para gerenciar tickets (chamados) na API
 * Inclui operações CRUD e busca de tickets com paginação e filtros.
 * @see TicketService.getTickets para busca paginada
 * @see TicketService.createTicket para criação de tickets
 * @see TicketService.updateTicket para atualização de tickets
 * @see TicketService.updateStatus para atualização de status de tickets
 * @see TicketService.deleteTicket para exclusão de tickets
 * @see TicketService.getTicket para busca de ticket por ID
 * @see TicketService.getTicketsByUser para busca de tickets por usuário
 */
const TicketService = {
  createTicket: async (data: TicketCreate): Promise<Ticket> => {
    try {
      const response = await api.post<Ticket>("/tickets/", data);
      return mapTicketId(response.data);
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },
  getTickets: async (
    page: number = 0,
    size: number = 10,
    search?: string,
    statusId?: number,
    prioridadeId?: number,
    cursoId?: number
  ): Promise<ResponsePaginated<Ticket>> => {
    try {

      // constrói a URL com os parâmetros de paginação e filtros  
      const url = `/tickets/?page=${page}&size=${size}` +
        `&search=${search || ''}` +
        `&statusId=${statusId || ''}` +
        `&prioridadeId=${prioridadeId || ''}` +
        `&cursoId=${cursoId || ''}`;

      // faz a requisição para a API
      const response = await api.get<ResponsePaginated<Ticket>>(url);
      // converte e preserva metadados de paginação
      const paginated = {
        ...response.data,
        content: response.data.content.map(mapTicketId),
      } as ResponsePaginated<Ticket>;
      return paginated;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },
  getTicketsByUser: async (userId: string) => {
    // Implementation for fetching tickets by user ID
  },
  getTicket: async (id: string) => {
    // Implementation for fetching a ticket by ID
  },
  updateTicket: async (id: number, data: TicketUpdate) => {
    try {
      const response = await api.put<Ticket>(`/tickets/${id}`, data);
      return mapTicketId(response.data);
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw error;
    }
  },
  updateStatus: async (id: number, data: TicketUpdate) => {  
    try {
      const response = await api.patch<Ticket>(`/tickets/${id}/status`, data);
      return mapTicketId(response.data);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      throw error;
    }
  },
  deleteTicket: async (id: string) => {
    // Implementation for deleting a ticket
  },
  getDashboard: async (): Promise<TicketDashboard> => {
    try {
      const response = await api.get<TicketDashboard>("/tickets/dashboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching ticket dashboard:", error);
      throw error;
    }
  },
  getTicketsStatsMes: async (): Promise<TicketStatsMes[]> => {
    try {
      const response = await api.get<TicketStatsMes[]>("/tickets/tickets-por-mes");
      return response.data;
    } catch (error) {
      console.error("Error fetching ticket stats by month:", error);
      throw error;
    }
  },

  getTicketMessages: async (id: number): Promise<TicketMessages[]> => {
    try {
      const response = await api.get<TicketMessages[]>(`/tickets/mensagens/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching ticket messages: ", error);
      throw error;
    }
  },

  getTicketMovimentacoes: async (ticketId: string): Promise<TicketMovimentacao[]> => {
    try {
      const response = await api.get<TicketMovimentacao[]>(`/tickets/movimentacoes/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching ticket movimentacoes:", error);
      throw error;
    }
  },

  reopenTicket: async (id: number) => {
    try {
      const response = await api.patch<Ticket>(`/tickets/${id}/reabrir`);
      return mapTicketId(response.data);
    } catch (error) { 
      console.error("Error reopening ticket:", error);
      throw error;
    }
  },
};

export default TicketService;
