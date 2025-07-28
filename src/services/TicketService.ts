import api from "@/lib/axios";

const TicketService = {
  createTicket: async (data: any) => {
    // Implementation for creating a ticket
  },
  getTickets: async (page: number = 0, size: number = 10) => {
    api.get<ResponsePaginated<Ticket>>(`/tickets/?page=${page}&size=${size}`)
      .then(response => {
        return response.data.content;
      })
      .catch(error => {
        console.error("Error fetching tickets:", error);
        throw error;
      });
  },
  getTicketsByUser: async (userId: string) => {
    // Implementation for fetching tickets by user ID
  },
  getTicket: async (id: string) => {
    // Implementation for fetching a ticket by ID
  },
  updateTicket: async (id: string, data: any) => {
    // Implementation for updating a ticket
  },
  deleteTicket: async (id: string) => {
    // Implementation for deleting a ticket
  },
};

export default TicketService;
