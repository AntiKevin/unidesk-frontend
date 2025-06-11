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

const statusMap = {
  aberto: { label: 'Aberto', color: 'primary' },
  resolvido: { label: 'Resolvido', color: 'success' },
  emAndamento: { label: 'Em Andamento', color: 'warning' },
} as const;

export interface Ticket {
  id: string;
  titulo: string;
  solicitante: {nome: string, email: string};
  departamento: string;
  prioridade: string
  status: 'aberto' | 'emAndamento' | 'resolvido';
  criadoEm: Date;
}

export interface LatestOrdersProps {
  tickets?: Ticket[];
  sx?: SxProps;
}

export function LatestTickets({ tickets = [], sx }: LatestOrdersProps): React.JSX.Element {

  

  return (
    <Card sx={sx}>
      <CardHeader title="Ultimos Chamados" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Titulo</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => {
              const { label, color } = statusMap[ticket.status] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.titulo}</TableCell>
                  <TableCell>{dayjs(ticket.criadoEm).format('D, MMM YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
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
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
