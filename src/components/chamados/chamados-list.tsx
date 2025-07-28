'use client';
import { IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/system';
import { Check, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import * as React from 'react';
import DialogCustom from './dialog-custom';

import { exemplosChamados } from './chamados-mock';
import type { status } from './dialog-custom';

const statusMap = {
  1: { label: 'Aberto', color: 'warning' },
  2: { label: 'Em Andamento', color: 'info' },
  3: { label: 'Resolvido', color: 'success' },
  4: { label: 'Fechado', color: 'default' },
} as const;

const statusKeyMap = {
  aberto: 1,
  emAndamento: 2,
  resolvido: 3,
  fechado: 4,
} as const;

export interface ChamadosListProps {
  chamados?: Ticket[];
  sx?: SxProps;
}

export function ChamadosList({ chamados = [], sx }: ChamadosListProps): React.JSX.Element {

  const dadosChamados = chamados.length > 0 ? chamados : exemplosChamados;

  const [selectedElement, setSelectedElement] = React.useState<Ticket | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'view' | 'finalize'>('view');

  const openDialog = (ticket: Ticket, mode: 'view' | 'finalize') => {
    setSelectedElement(ticket);
    setMode(mode);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedElement(null);
    setDialogOpen(false);
  };

  const handleDialogSubmit = (status: string) => {
    console.log('Mudança do ticket: ', status);
    
  };

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
            {dadosChamados.map((chamado) => {
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
                      <Tooltip title="Fechar">
                          <IconButton onClick= {() => openDialog(chamado, 'finalize')}>
                            <Check />
                          </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          Ver todos
        </Button>
      </CardActions>

      <DialogCustom 
        open={isDialogOpen}
        onClose={closeDialog}
        chamado={selectedElement}
        mode={mode}
        onSubmit={handleDialogSubmit}
        currentStatus={selectedElement?.status?.nome as status ?? "Aberto"}
      />
    </Card>
  );
}