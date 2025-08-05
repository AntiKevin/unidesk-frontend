import api from "@/lib/axios";

const CursoService = {
    getCursos: async (): Promise<Curso[]> => {
        try {
        const response = await api.get<Curso[]>("/cursos/");
        return response.data;
        } catch (error) {
        console.error("Error fetching cursos:", error);
        throw error;
        }
    },
};

export default CursoService;