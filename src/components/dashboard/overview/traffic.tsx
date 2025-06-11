'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';
import { Check, ClockCounterClockwise, Gear } from '@phosphor-icons/react/dist/ssr';

const iconMapping = { Abertos: ClockCounterClockwise, Andamento: Gear, Resolvidos: Check } as Record<string, Icon>;


export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
}

export function Traffic({ chartSeries, labels, sx}: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);
  const totalTickets = chartSeries[0] + chartSeries[1] + chartSeries[2];
  
  return (
    <Card sx={sx}>
      <CardHeader title="Chamados" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];
              const percent = chartSeries[index]/ totalTickets;
              return (
                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                  {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}
                  <Typography variant="h6">{label}</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {percent * 100}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.warning.main, theme.palette.success.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
