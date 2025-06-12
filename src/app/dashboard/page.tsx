import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { LatestTickets, Ticket } from '@/components/dashboard/overview/latest-tickets';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Statistics } from '@/components/dashboard/overview/statistics';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalTickets } from '@/components/dashboard/overview/total-tickets';
import { TotalSolved } from '@/components/dashboard/overview/total-solved';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { PendingTickets } from '@/components/dashboard/overview/pending-tickets';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

const products = [
            {
              id: 'PRD-005',
              name: 'Soja & Co. Eucalyptus',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Necessaire Body Lotion',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Ritual of Sakura',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Lancome Rouge',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ];

const ticketsData: Ticket[] = [
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

const percentTicketsOpenAndInQueue = ticketsData.filter(ticket => ["emAndamento", "aberto"].includes(ticket.status)).length/ ticketsData.length * 100;
const solvedTickets = ticketsData.filter(ticket => ["resolvido"].includes(ticket.status)).length;
const openTickets = ticketsData.filter(ticket => ["aberto"].includes(ticket.status)).length;
const inProgressTickets = ticketsData.filter(ticket => ["emAndamento"].includes(ticket.status)).length;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      
      <Grid lg={3} sm={6} xs={12}>
        <TotalTickets diff={16} trend="down" sx={{ height: '100%' }} value={ticketsData.length} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={percentTicketsOpenAndInQueue} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <PendingTickets diff={14} trend='down' sx={{ height: '100%' }} value={openTickets} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalSolved sx={{ height: '100%' }} value={solvedTickets} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Statistics
          chartSeries={[
            { name: 'Este ano', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Ultimo ano', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[openTickets, inProgressTickets, solvedTickets]}  labels={['Abertos', 'Andamento', 'Resolvidos']} sx={{ height: '100%' }} />
      </Grid>
      
    </Grid>
  );
}
