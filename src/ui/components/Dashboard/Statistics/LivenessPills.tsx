import { useLiveness } from '@/ui/hooks/ui/useLiveness';
import PillsSkeleton from './PillsSkeleton';
import { PopoverBubble } from './PopoverBubble';
import { useTranslations } from 'next-intl';

function formatUptime(secondsRaw: number): string {
  const total = Math.floor(secondsRaw);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const parts: string[] = [];
  if (days) {
    parts.push(`${days}d`);
  }
  if (hours) {
    parts.push(`${hours}h`);
  }
  if (minutes) {
    parts.push(`${minutes}m`);
  }
  if (seconds || parts.length === 0) {
    parts.push(`${seconds}s`);
  }

  return parts.join(' ');
}

export default function LivenessPills() {
  const { liveness, error, loading } = useLiveness();
  const t = useTranslations('LivenessPills');
  if (loading) {
    return <PillsSkeleton />;
  }

  return (
    <div className="px-6">
      {!error && (
        <div className="bg-[#F3F2F4] p-2 rounded-full flex gap-4">
          {liveness.map((item) => {
            const code = Number(item.status);
            let dotColor = 'bg-gray-500';
            if (code === 200 || (code === 429 && item.instanceName === 'HASHICORP_VAULT')) {
              dotColor = 'bg-green-500';
            } else if (
              (code >= 400 && code < 500) ||
              (code === 429 && item.instanceName !== 'HASHICORP_VAULT')
            ) {
              dotColor = 'bg-yellow-500';
            } else if (code > 500) {
              dotColor = 'bg-red-500';
            }

            let displayName = t(item.instanceName as any);
            if (displayName === item.instanceName) {
              displayName = item.instanceName;
            }
            const niceUptime = formatUptime(item.uptime);

            return (
              <div key={item.instanceName} className="group relative inline-block">
                <div className="flex items-center space-x-2 px-2 py-2 rounded-full bg-white min-w-[140px]">
                  <span className={`w-4 h-4 rounded-full ${dotColor}`} />
                  <span className="text-[14px] text-gray-800">{displayName}</span>
                </div>

                {/* popover */}
                <PopoverBubble>
                  <span className="text-[14px]">Uptime:</span>
                  <span className="text-xs">{niceUptime}</span>
                </PopoverBubble>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
