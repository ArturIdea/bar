'use client';

import { useCallbackHandler } from '@/ui/hooks/ui/useCallbackHandler';

const Callback = () => {
  const { isLoading, error } = useCallbackHandler();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error during authentication: {error}</div>;
  }

  return null;
};

export default Callback;
