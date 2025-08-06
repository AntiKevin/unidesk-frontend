import api from "@/lib/axios";

const FuncCoordenacaoService = {
  getFuncionarios: async (): Promise<Funcionario[]> => {
    try {
        const response = await api.get('/funcionarios-coordenacao/');
        return response.data;
    }
    catch (error) {
        console.error("Error fetching funcionarios:", error);
        throw error;
    }
  },
  getFuncionarioById: async (id: number): Promise<Funcionario> => {
    try {
      const response = await api.get<Funcionario>(`/funcionarios-coordenacao/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching funcionario coordenacao with id ${id}:`, error);
      throw error;
    }
  },
};

export default FuncCoordenacaoService;
