import api from "@/lib/axios";

const CategoriaService = {
  getCategorias: async (): Promise<Categoria[]> => {
    try {
      const response = await api.get<Categoria[]>("/categorias/");
      return response.data;
    } catch (error) {
      console.error("Error fetching categorias:", error);
      throw error;
    }
  },
  getCategoriaById: async (id: string): Promise<Categoria> => {
    try {
      const response = await api.get<Categoria>(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching categoria with id ${id}:`, error);
      throw error;
    }
  }
};

export default CategoriaService;
