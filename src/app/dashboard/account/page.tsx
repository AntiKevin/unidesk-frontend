import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import type { Metadata } from 'next';
import * as React from 'react';

import { AccountInfo } from '@/components/dashboard/account/account-info';
import { config } from '@/config';

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Conta</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <AccountInfo />
        </Grid>
        {/* <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm />
        </Grid> */}
      </Grid>
    </Stack>
  );
}
