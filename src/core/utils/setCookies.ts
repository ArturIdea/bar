'use server';

import { cookies } from 'next/headers';

export async function setServerCookie({
  name,
  value,
  options = {}
}: {
  name: string;
  value: string;
  options?: {
    maxAge?: number;
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  };
}) {
  const c = await cookies();
  c.set(name, value, options);
}
