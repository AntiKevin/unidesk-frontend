// import api from "@/lib/axios";



// const ConfigService = {
//     updatePassword: async (currentPassword: string, newPassword: string) => {
//         try {
//             const token = localStorage.getItem('auth-token'); // ou de cookie se usar SSR

//             const response = await api.post(``, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`, // opcional, depende da sua auth
//                 },
//                 body: JSON.stringify({ currentPassword, newPassword }),
//         });

//         if (!response.ok) {
//         const data = await response.json();
//         return { error: data.message || 'Erro ao atualizar senha' };
//         }

//         return {};
//         } catch (error) {
//             console.error("Error changing password: ", error);
//         }
//     }
// }