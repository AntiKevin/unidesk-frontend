'use client';
import * as React from 'react';
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
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';
import { Stack } from '@mui/system';
import { IconButton, Tooltip } from '@mui/material';
import { Check, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import DialogCustom from './dialog-custom';

const statusMap = {
  aberto: { label: 'Aberto', color: 'warning' },
  emAndamento: { label: 'Em Andamento', color: 'info' },
  resolvido: { label: 'Resolvido', color: 'success' },
  fechado: { label: 'Fechado', color: 'default' },
} as const;

export interface Chamado {
  id: string;
  titulo: string;
  solicitante: { nome: string; email: string };
  departamento: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  status: 'aberto' | 'emAndamento' | 'resolvido' | 'fechado';
  criadoEm: Date;
}

export interface ChamadosListProps {
  chamados?: Chamado[];
  sx?: SxProps;
}

export function ChamadosList({ chamados = [], sx }: ChamadosListProps): React.JSX.Element {
  // Dados de exemplo
  const exemplosChamados: Chamado[] = [
    {
      id: 'CHAM-001',
      titulo: 'Problema de acesso ao sistema acadêmico',
      solicitante: { nome: 'João Silva', email: 'joao.silva@email.com' },
      departamento: 'Secretaria Acadêmica',
      prioridade: 'alta',
      status: 'aberto',
      criadoEm: dayjs().subtract(2, 'hour').toDate()
    },
    {
      id: 'CHAM-002',
      titulo: 'Solicitação de material didático',
      solicitante: { nome: 'Maria Santos', email: 'maria.santos@email.com' },
      departamento: 'Biblioteca',
      prioridade: 'media',
      status: 'emAndamento',
      criadoEm: dayjs().subtract(1, 'day').toDate()
    },
    {
      id: 'CHAM-003',
      titulo: 'Manutenção em equipamento de laboratório',
      solicitante: { nome: 'Carlos Pereira', email: 'carlos.pereira@email.com' },
      departamento: 'Laboratório de Química',
      prioridade: 'critica',
      status: 'emAndamento',
      criadoEm: dayjs().subtract(3, 'day').toDate()
    },
    {
      id: 'CHAM-004',
      titulo: 'Dúvida sobre matrícula',
      solicitante: { nome: 'Ana Oliveira', email: 'ana.oliveira@email.com' },
      departamento: 'Secretaria Acadêmica',
      prioridade: 'baixa',
      status: 'resolvido',
      criadoEm: dayjs().subtract(5, 'day').toDate()
    },
  ];

  const dadosChamados = chamados.length > 0 ? chamados : exemplosChamados;

  const [selectedElement, setSelectedElement] = React.useState<Chamado | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'view' | 'finalize'>('view');

  const openDialog = (ticket: Chamado, mode: 'view' | 'finalize') => {
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
              const { label, color } = statusMap[chamado.status];

              return (
                <TableRow hover key={chamado.id}>
                  <TableCell>{chamado.id}</TableCell>
                  <TableCell>{chamado.titulo}</TableCell>
                  <TableCell>{chamado.solicitante.nome}</TableCell>
                  <TableCell>{chamado.departamento}</TableCell>
                  <TableCell>{dayjs(chamado.criadoEm).format('DD/MM/YYYY HH:mm')}</TableCell>
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
        currentStatus={selectedElement?.status ?? 'aberto'}
      />
    </Card>
  );
}