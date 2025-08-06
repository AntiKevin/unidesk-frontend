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
import { useRouter } from 'next/navigation';
import * as React from 'react';

// Mapeamento de status conforme ChamadosList
// Mapeamento de status conforme ChamadosList
const statusMap = {
  1: { label: 'Aberto', color: 'warning' },
  2: { label: 'Em Andamento', color: 'info' },
  3: { label: 'Fechado', color: 'success' },
  4: { label: 'Pendente', color: 'error' },
} as const;

export interface LatestTicketsProps {
  tickets?: Ticket[];
  sx?: SxProps;
}

export function LatestTickets({ tickets = [], sx }: LatestTicketsProps): React.JSX.Element {

  const router = useRouter();

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
              const statusKey = ticket.status.idStatus as keyof typeof statusMap;
              const { label, color } = statusMap[statusKey] ?? { label: 'Desconhecido', color: 'default' };

              return (
                <TableRow hover key={ticket.id}>
                  <TableCell>{ticket.idTicket}</TableCell>
                  <TableCell>{ticket.titulo}</TableCell>
                  <TableCell>{new Date(ticket.dataCriacao * 1000).toLocaleString()}</TableCell>
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
          onClick={() => {router.push('/dashboard/chamados')}}
          variant="text"
        >
          Ver Todos
        </Button>
      </CardActions>
    </Card>
  );
}
