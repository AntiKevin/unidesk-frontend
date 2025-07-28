"use client";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import * as React from 'react';

import { ChamadosFilters } from '@/components/chamados/chamados-filters';
import { ChamadosList } from '@/components/chamados/chamados-list';
import { ChamadosStats } from '@/components/chamados/chamados-stats';
import { paths } from '@/paths';
import TicketService from '@/services/TicketService';

export default function Page(): React.JSX.Element {
    // Define o estado para armazenar os chamados
    const [tickets, setTickets] = React.useState<Ticket[]>([]);

    // Realiza a busca dos chamados na API
    const getChamados = async () => {
        try {
            const tickets = await TicketService.getTickets();
            setTickets(tickets);
        } catch (error) {
            console.error('Erro ao buscar chamados:', error);
        }
    }

    React.useEffect(() => {
        getChamados();
    }, []);
    
    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                    <Typography variant="h4">Chamados</Typography>
                </div>
                <div>
                    <Button
                        startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
                        variant="contained"
                        href={paths.dashboard.novoChamado}
                    >
                        Novo Chamado
                    </Button>
                </div>
            </Stack>

            <ChamadosStats chamados={tickets} />
            <ChamadosFilters />
            <ChamadosList chamados={tickets} />
        </Stack>
    );
}