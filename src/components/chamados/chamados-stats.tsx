import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { CheckCircle as CheckIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { ClockCounterClockwise as ClockIcon } from '@phosphor-icons/react/dist/ssr/ClockCounterClockwise';
import { Gear as GearIcon } from '@phosphor-icons/react/dist/ssr/Gear';
import { Ticket as TicketIcon } from '@phosphor-icons/react/dist/ssr/Ticket';
import * as React from 'react';

export interface ChamadosStatsProps { chamados: Ticket[]; }
export function ChamadosStats({ chamados }: ChamadosStatsProps): React.JSX.Element {
  // Caso não receba tickets, usar array vazio
  const data = chamados || [];
  
  const totalChamados = data.length;
  const chamadosAbertos = data.filter(chamados => chamados.status.nome === 'Aberto').length;
  const chamadosEmAndamento = data.filter(chamados => chamados.status.nome === 'Em Andamento').length;
  const chamadosResolvidos = data.filter(chamados => chamados.status.nome === 'Fechado').length;

  return (
    <Grid container spacing={3}>
      <Grid xs={12} sm={6} lg={3}>
        <Card>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Total de Chamados
                </Typography>
                <Typography variant="h5">{totalChamados}</Typography>
              </Stack>
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  color: 'primary.contrastText',
                  p: 1,
                  display: 'flex',
                }}
              >
                <TicketIcon fontSize="var(--icon-fontSize-lg)" />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6} lg={3}>
        <Card>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Chamados Abertos
                </Typography>
                  <Typography variant="h5">{chamadosAbertos}</Typography>
              </Stack>
              <Box
                sx={{
                  backgroundColor: 'warning.main',
                  borderRadius: '50%',
                  color: 'warning.contrastText',
                  p: 1,
                  display: 'flex',
                }}
              >
                <ClockIcon fontSize="var(--icon-fontSize-lg)" />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6} lg={3}>
        <Card>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Em Andamento
                </Typography>
                <Typography variant="h5">{chamadosEmAndamento}</Typography>
              </Stack>
              <Box
                sx={{
                  backgroundColor: 'info.main',
                  borderRadius: '50%',
                  color: 'info.contrastText',
                  p: 1,
                  display: 'flex',
                }}
              >
                <GearIcon fontSize="var(--icon-fontSize-lg)" />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6} lg={3}>
        <Card>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Resolvidos
                </Typography>
                <Typography variant="h5">{chamadosResolvidos}</Typography>
              </Stack>
              <Box
                sx={{
                  backgroundColor: 'success.main',
                  borderRadius: '50%',
                  color: 'success.contrastText',
                  p: 1,
                  display: 'flex',
                }}
              >
                <CheckIcon fontSize="var(--icon-fontSize-lg)" />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}