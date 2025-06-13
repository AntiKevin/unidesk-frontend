export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    chamados: '/dashboard/chamados',
    novoChamado: '/dashboard/chamados/novo',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
