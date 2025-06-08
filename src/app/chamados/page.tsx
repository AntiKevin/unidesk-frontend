import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { ChamadosList } from '@/components/chamados/chamados-list';
import { ChamadosFilters } from '@/components/chamados/chamados-filters';
import { ChamadosStats } from '@/components/chamados/chamados-stats';

export const metadata = { title: `Chamados | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                    <Typography variant="h4">Chamados</Typography>
                </div>
                <div>
                    <Button
                        startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
                        variant="contained"
                    >
                        Novo Chamado
                    </Button>
                </div>
            </Stack>

            <ChamadosStats />
            <ChamadosFilters />
            <ChamadosList />
        </Stack>
    );
}