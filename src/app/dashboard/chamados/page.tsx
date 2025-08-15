"use client";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import * as React from 'react';

import { ChamadosFilters } from '@/components/chamados/chamados-filters';
import { ChamadosList } from '@/components/chamados/chamados-list';
import { ChamadosStats } from '@/components/chamados/chamados-stats';
import { useUser } from '@/hooks/use-user';
import { paths } from '@/paths';
import TicketService from '@/services/TicketService';

export default function Page(): React.JSX.Element {
  const { user } = useUser();
  const [activeTab, setActiveTab] = React.useState(0);

  // Define o estado para armazenar os chamados (todos, para stats)
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  // filtros de status por tab
  const tabStatusMap: Array<number | null> = [1, 4, 3];

  // Estado para filtros aplicados
  const [filters, setFilters] = React.useState<{
    search: string;
    statusId: number | null;
    prioridadeId: number | null;
    cursoId: number | null;
  }>( { search: '', statusId: null, prioridadeId: null, cursoId: null } );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setFilters(prev => ({ ...prev, statusId: tabStatusMap[newValue] }));
  };

  // Realiza a busca dos chamados na API
  const getChamados = async () => {
    try {
      const response = await TicketService.getTickets();
      setTickets(response.content);
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
    }
  };

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

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Meus Chamados" />
          {(user?.role === 'COORDENADOR' || user?.role === 'FUNCIONARIO_COORDENACAO') && (
            <Tab label="Pendentes Aprovação" />
          )}
          <Tab label="Chamados Fechados" />
        </Tabs>

        <ChamadosStats chamados={tickets} />
        <ChamadosFilters onFilter={(f) => setFilters(prev => ({ ...prev, ...f }))} />
        <ChamadosList filters={filters} />
      </Stack>
  );
}