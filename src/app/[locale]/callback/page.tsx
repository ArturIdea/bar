'use client';

import { useCallbackHandler } from '@/ui/hooks/ui/useCallbackHandler';

const CallbackPage = () => {
  const { isLoading, error } = useCallbackHandler();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error during authentication: {error}</div>;
  }

  return null;
};

export default CallbackPage;
