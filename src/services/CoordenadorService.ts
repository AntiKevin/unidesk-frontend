import api from "@/lib/axios";

/**
 * Service para interações com a API relacionadas ao coordenador.
 * Este serviço permite buscar informações sobre a coordenação associada a um usuário.
 */
const CoordenadorService = {
    async getCoordenadorById(userId: string): Promise<Coordenador> {
        try {
            const response = await api.get<Coordenador>(`/coordenadores/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching coordenacao for user ${userId}:`, error);
            throw error;
        }
    },
}

export default CoordenadorService;
