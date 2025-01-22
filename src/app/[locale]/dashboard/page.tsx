'use client';

import { useEffect } from 'react';
import { ApiClient } from '@/core/ApiClient';
import { API_URL } from '@/core/config';
import { useAuth } from '@/ui/hooks/ui/useAuth';

const DashboardPage = () => {
  const { isAuthenticated, accessToken, refreshToken } = useAuth();

  useEffect(() => {
    ApiClient.shared.get(`${API_URL}/api/documents`);
  });

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your access token is: {accessToken}</p>
      <p>Your refresh token is: {refreshToken}</p>
    </div>
  );
};

export default DashboardPage;
