'use client';
import { useUser } from '@/hooks/use-user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export function AccountInfo(): React.JSX.Element {
  const { user, checkSession } = useUser();
  const router = useRouter();


  // Monta o nome completo a partir de firstName e lastName ou usa email como fallback
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

  const handleSignOut = React.useCallback(async (): Promise<void> => {
      try {
        const { error } = await authClient.signOut();
  
        if (error) {
          logger.error('Sign out error', error);
          return;
        }
  
        // Refresh the auth state
        await checkSession?.();
  
        // UserProvider, for this case, will not refresh the router and we need to do it manually
        router.refresh();
        // After refresh, AuthGuard will handle the redirect
      } catch (err) {
        logger.error('Sign out error', err);
      }
    }, [checkSession, router]);
  
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar
              src={typeof user?.avatar === 'string' ? user.avatar : undefined}
              sx={{
                height: '40px', 
                width: '40px', 
                cursor: 'pointer',
                bgcolor: blue[500],
              }}
            >
              {user?.firstName?.charAt(0)?.toUpperCase() 
                || user?.email?.charAt(0)?.toUpperCase() 
                || 'U'}
            </Avatar>
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              {fullName || user?.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.role}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button 
          fullWidth 
          variant="text" 
          color='error'
          onClick={handleSignOut}  
        >
          Sair
        </Button>
      </CardActions>
    </Card>
  );
}
