import Stack from '@mui/material/Stack';
import type { Metadata } from 'next';
import * as React from 'react';

import { NovoChamadoForm } from '@/components/chamados/chamado-form';
import { config } from '@/config';

export const metadata = { title: `Chamados | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <h1>Novo Chamado</h1>
            </Stack>
            <Stack spacing={2}>
                <NovoChamadoForm />
            </Stack>
        </Stack>
    );
}