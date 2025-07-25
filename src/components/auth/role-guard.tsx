'use client';

import { useUser } from '@/hooks/use-user';
import { paths } from '@/paths';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface RoleGuardProps {
  /** Roles permitidas para acessar a rota */
  allowedRoles: Role[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      router.replace(paths.auth.signIn);
      return;
    }

    // Verifica se o role do usuário está na lista de permitidos
    if (!allowedRoles.includes(user.role as Role)) {
      router.replace(paths.errors.notFound);
      return;
    }

    setIsChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, error]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
