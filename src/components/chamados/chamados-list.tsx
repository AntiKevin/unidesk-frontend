'use client';
import { IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/system';
import { Check, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import * as React from 'react';
import DialogCustom from './dialog-custom';

import { useUser } from '@/hooks/use-user';
import TicketService from '@/services/TicketService';
import { exemplosChamados } from './chamados-mock';


const statusMap = {
  1: { label: 'Aberto', color: 'warning' },
  2: { label: 'Em Andamento', color: 'info' },
  3: { label: 'Fechado', color: 'success' },
  4: { label: 'Pendente', color: 'error' },

} as const;

export interface ChamadosListProps {
  chamados?: Ticket[];
  sx?: SxProps;
  filters?: {
    search: string;
    statusId: number | null;
    prioridadeId: number | null;
    cursoId: number | null;
  };
}

export function ChamadosList({ chamados = [], sx, filters }: ChamadosListProps): React.JSX.Element {

  const { user } = useUser();

  const [selectedElement, setSelectedElement] = React.useState<Ticket | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'view' | 'finalize'>('view');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dadosPaginated, setDadosPaginated] = React.useState<ResponsePaginated<Ticket> | null>(null);

  // Estados de filtros (desestruturando com valores padrão)
  const {
    search = '',
    statusId = null,
    prioridadeId = null,
    cursoId = null,
  } = filters || {};

  // Função para buscar chamados paginados da API
  const fetchChamados = async () => {
    try {
      const result = await TicketService.getTickets(
        page,
        rowsPerPage,
        search,
        statusId ?? undefined,
        prioridadeId ?? undefined,
        cursoId ?? undefined
      );
      setDadosPaginated(result);
    } catch (error) {
      console.error('Erro ao buscar chamados paginados:', error);
    }
  };

  const openDialog = (ticket: Ticket, mode: 'view' | 'finalize') => {
    setSelectedElement(ticket);
    setMode(mode);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedElement(null);
    setDialogOpen(false);
  };

  const handleCurrentStatus = (): Status => {
    if (selectedElement?.status) {
      return { 
        idStatus: selectedElement.status.idStatus, 
        nome: selectedElement.status.nome 
      };
    }
    return { 
      idStatus: 0, 
      nome: 'Status indefinido' 
    };
  }

  const handleDialogSubmit = async (payload: TicketUpdate) => {
    if (!selectedElement) return;
    try {
      await TicketService.updateTicket(selectedElement.idTicket, payload);
      closeDialog();
      // Recarrega lista após atualização
      fetchChamados();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  // busca chamados paginados da API com filtros quando parâmetros mudam
  React.useEffect(() => {
    fetchChamados();
  }, [page, rowsPerPage, search, statusId, prioridadeId, cursoId]);

  return (
    <Card sx={sx}>
      <CardHeader title="Chamados recentes" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Solicitante</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell sortDirection="desc">Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(dadosPaginated?.content || exemplosChamados).map((chamado) => {
        const { label, color } = statusMap[chamado.status.idStatus as keyof typeof statusMap] || { label: 'Desconhecido', color: 'default' };

              return (
                <TableRow hover key={chamado.id}>
                  <TableCell>{chamado.id}</TableCell>
                  <TableCell>{chamado.titulo}</TableCell>
                  <TableCell>{chamado.aluno.nome}</TableCell>
                  <TableCell>{chamado.aluno.curso.nome}</TableCell>
                  <TableCell>{new Date(chamado.dataCriacao * 1000).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Tooltip title="Visualizar">
                          <IconButton onClick={() => openDialog(chamado, 'view')}>
                            <MagnifyingGlass />
                          </IconButton>
                      </Tooltip>
                      {user?.role !== "ALUNO" 
                      && chamado.status.idStatus !== 3 
                      && !( user?.role === "FUNCIONARIO_COORDENACAO" && chamado.status.idStatus === 4 ) 
                      && (
                        <Tooltip title="Fechar">
                          <IconButton onClick={() => openDialog(chamado, 'finalize')}>
                            <Check />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={dadosPaginated?.totalElements ?? exemplosChamados.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={event => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <DialogCustom 
        open={isDialogOpen}
        onClose={closeDialog}
        chamado={selectedElement}
        mode={mode}
        onSubmit={handleDialogSubmit}
        currentStatus={handleCurrentStatus()}
        refreshTickets={fetchChamados}
      />
    </Card>
  );
}