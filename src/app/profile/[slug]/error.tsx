'use client';

import ErrorComponent from '@/ui/components/Common/ErrorComponent';

export default function ErrorPage({ error }: { error: Error }) {
  return <ErrorComponent error={error} />;
}
