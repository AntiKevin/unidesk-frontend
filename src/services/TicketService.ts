import api from "@/lib/axios";

// essa função é para mapear o ticket retornado pela API para o tipo Ticket
// criada principalmente para garantir que o id seja tipado sem o '@id'
const mapTicketId = (ticket: any): Ticket => {
  const convertedTicket = {
    id: ticket['@id'],
    ...ticket,
  };
  return convertedTicket;
};

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
  getTickets: async (page: number = 0, size: number = 10): Promise<Ticket[]> => {
    try {
      const response = await api.get<ResponsePaginated<Ticket>>(`/tickets/?page=${page}&size=${size}`);
      const typedTickets = response.data.content.map(mapTicketId);
      return typedTickets;
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
  updateTicket: async (id: number, data: TicketCreate) => {
    try {
      const response = await api.patch<Ticket>(`/tickets/${id}`, data);
      return mapTicketId(response.data);
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw error;
    }
  },
  updateStatus: async (id: number, data: TicketCreate) => {  
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
};

export default TicketService;
