/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';

interface ITokenRoles {
  roles: string[];
}

interface IResourceAccess {
  baraka?: ITokenRoles;
  account?: ITokenRoles;
  [key: string]: ITokenRoles | undefined;
}

interface IDecodedToken {
  resource_access?: IResourceAccess;
  //add more fields if needed
}

interface IUserRoles {
  isAdmin: boolean;
  isDeveloper: boolean;
  isAgent: boolean;
  isSuperAdmin: boolean;
  roles: string[];
  hasRole: (role: string) => boolean;
  token: IDecodedToken | null;
}

export const useUserRoles = (): IUserRoles => {
  const [token, setToken] = useState<IDecodedToken | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    try {
      const cookies = new Cookies();
      const accessToken = cookies.get('accessToken');

      if (accessToken) {
        const decoded = jwt.decode(accessToken) as IDecodedToken;
        setToken(decoded);

        const userRoles = decoded?.resource_access?.baraka?.roles || [];
        setRoles(userRoles);
      } else {
        setRoles([]);
        setToken(null);
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      setRoles([]);
      setToken(null);
    }
  }, []);

  const hasRole = (role: string): boolean => {
    return roles.includes(role);
  };

  const isAdmin = hasRole('ROLE_ADMIN');
  // const isAdmin = false;

  const isAgent = hasRole('ROLE_AGENT');
  // const isAgent = false;

  // const isDeveloper = hasRole('ROLE_DEVELOPER');
  const isDeveloper = false;

  const isSuperAdmin = hasRole('ROLE_SUPERADMIN');
  // const isSuperAdmin = true;

  return {
    isAdmin,
    isAgent,
    isDeveloper,
    isSuperAdmin,
    roles,
    hasRole,
    token,
  };
};

