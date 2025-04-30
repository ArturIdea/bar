import { useEffect, useState } from 'react';
import { useLiveness } from '@/ui/hooks/ui/useLiveness';
import PillsSkeleton from './PillsSkeleton';

const statusStyles: Record<string, { dot: string }> = {
  '200': { dot: 'bg-green-500' },
  '503': { dot: 'bg-red-500' },
};

export default function LivenessPills() {
  const { liveness, error, loading: livenessLoading } = useLiveness();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (livenessLoading) {
    return <PillsSkeleton />;
  }

  return (
    <>
      {!error && (
        <div className="px-6 ">
          <div className="bg-[#ADD9F4] p-2 rounded-full flex gap-4">
            {liveness.map((item) => {
              const styles = statusStyles[item.status] ?? {
                dot: 'bg-gray-500',
              };
              const lastCheckedMs = new Date(`${item.lastCheckedAt}Z`).getTime();
              const secondsAgo = Math.floor((now - lastCheckedMs) / 1000);
              return (
                <div
                  key={item.instanceName}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-white w-[220px]
            `}
                >
                  <span className={`w-4 h-4 rounded-full ${styles.dot}`} />
                  <span className="text-sm font-medium text-gray-800">{item.instanceName}</span>
                  <span className="text-gray-200">|</span>
                  <span className="text-sm font-medium text-gray-800">{secondsAgo}s ago</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
