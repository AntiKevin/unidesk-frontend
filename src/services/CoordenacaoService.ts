import api from "@/lib/axios";

const CoordenacaoService = {
  getCoordenacoes: async (): Promise<Coordenacao[]> => {
    try {
      const response = await api.get<Coordenacao[]>('/coordenacoes/');
      return response.data;
    } catch (error) {
      console.error("Error fetching coordenacoes:", error);
      throw error;
    }
  },
};

export default CoordenacaoService;
