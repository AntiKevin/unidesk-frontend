import Stack from '@mui/material/Stack';
import type { Metadata } from 'next';
import * as React from 'react';

import { config } from '@/config';

export const metadata = { title: `Chamados | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <h1>Novo Chamado</h1>
                <p>Formulário para criação de um novo chamado.</p>
            </Stack>
            <Stack spacing={2}>
                {/* formulário para criar um novo chamado */}
                <p>Formulário de exemplo (ainda não implementado).</p>
            </Stack>
        </Stack>
    );
}