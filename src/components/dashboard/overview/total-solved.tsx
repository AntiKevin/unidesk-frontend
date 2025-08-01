import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import {  CheckCircle } from '@phosphor-icons/react/dist/ssr';

export interface TotalSolvedProps {
  sx?: SxProps;
  value: number;
}

export function TotalSolved({ value, sx }: TotalSolvedProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Resolvidos
            </Typography>
            <Typography variant="h4">{value as number}</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
            <CheckCircle fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
