'use client';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';

import { LatestTickets } from '@/components/dashboard/overview/latest-tickets';
import { PendingTickets } from '@/components/dashboard/overview/pending-tickets';
import { Statistics } from '@/components/dashboard/overview/statistics';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalSolved } from '@/components/dashboard/overview/total-solved';
import { TotalTickets } from '@/components/dashboard/overview/total-tickets';
import { Traffic } from '@/components/dashboard/overview/traffic';
import TicketService from '@/services/TicketService';


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [totalTickets, setTotalTickets] = useState(0);
  const [solvedTickets, setSolvedTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [percentOpenAndInQueue, setPercentOpenAndInQueue] = useState(0);
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [uiLatestTickets, setUiLatestTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    async function fetchData() {
      const dashboard = await TicketService.getDashboard();
      const statsMes = await TicketService.getTicketsStatsMes();
      const latestResp = await TicketService.getTickets(0, 5);
    
      setUiLatestTickets(latestResp.content);
      setTotalTickets(dashboard.totalTickets);
      setSolvedTickets(dashboard.totalTicketsResolvidos);
      setOpenTickets(dashboard.totalTicketsAbertos);
      setInProgressTickets(dashboard.totalTicketsEmAndamento);
      setPercentOpenAndInQueue(dashboard.porcentagemProgresso);
      const months = Array(12).fill(0);
      statsMes.forEach(item => {
        const idx = item.mes - 1;
        if (idx >= 0 && idx < 12) months[idx] = item.total;
      });
      setChartSeries([{ name: 'Este ano', data: months }]);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalTickets diff={0} trend="up" sx={{ height: '100%' }} value={totalTickets} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={percentOpenAndInQueue} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <PendingTickets diff={0} trend='up' sx={{ height: '100%' }} value={openTickets} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalSolved sx={{ height: '100%' }} value={solvedTickets} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Statistics chartSeries={chartSeries} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[openTickets, inProgressTickets, solvedTickets]} labels={['Abertos', 'Andamento', 'Resolvidos']} sx={{ height: '100%' }} />
      </Grid>
      <Grid xs={12}>
        <LatestTickets tickets={uiLatestTickets} />
      </Grid>
    </Grid>
  );
}
