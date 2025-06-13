import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import type { Metadata } from 'next';
import * as React from 'react';

import { ChamadosFilters } from '@/components/chamados/chamados-filters';
import { ChamadosList } from '@/components/chamados/chamados-list';
import { ChamadosStats } from '@/components/chamados/chamados-stats';
import { config } from '@/config';
import { paths } from '@/paths';

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
                        href={paths.dashboard.novoChamado}
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