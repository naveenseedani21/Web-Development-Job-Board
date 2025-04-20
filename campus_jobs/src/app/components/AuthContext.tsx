'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};
