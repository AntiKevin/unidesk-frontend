import api from "@/lib/axios";

const AlunoService = {
  getAlunosMeuCurso: async (): Promise<Aluno[]> => {
    try {
      const response = await api.get<Aluno[]>('/alunos/meu-curso');
      return response.data;
    } catch (error) {
      console.error('Error fetching alunos for my course:', error);
      throw error;
    }
  },
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
