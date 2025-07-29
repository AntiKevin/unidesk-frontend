import api from "@/lib/axios";

const PrioridadeService = {
  getPrioridades: async (): Promise<Prioridade[]> => {
    try {
      const response = await api.get<Prioridade[]>("/prioridades/");
      return response.data;
    } catch (error) {
      console.error("Error fetching prioridades:", error);
      throw error;
    }
  },
  getPrioridadeById: async (id: string): Promise<Prioridade> => {
    try {
      const response = await api.get<Prioridade>(`/prioridades/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching prioridade with id ${id}:`, error);
      throw error;
    }
  },
 
};

export default PrioridadeService;
