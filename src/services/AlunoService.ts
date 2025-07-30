import api from "@/lib/axios";

const AlunoService = {
  getAlunoById: async (id: number): Promise<Aluno> => {
    try {
      const response = await api.get<Aluno>(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching aluno with id ${id}:`, error);
      throw error;
    }
  }
};

export default AlunoService;
