import api from "@/lib/axios";

const StatusService = {
    getStatus: async () => {
        try {
            const response = await api.get<Status[]>('/status/');
            return response.data;
        } catch (error) {
            console.error("Error fetching status options:", error);
            throw error;
        }
    }
};

export default StatusService;