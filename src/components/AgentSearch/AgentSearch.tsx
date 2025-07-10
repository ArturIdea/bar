import React, { FormEvent, useEffect, useState } from 'react';
import {  UserSearch, X } from 'lucide-react';
import { useAgent } from '@/contexts/AgentContext';
import { agentService } from '@/services/agentService';
import { useTranslations } from 'next-intl';

export const AgentSearch: React.FC = () => {
  const [pinfl, setPinfl] = useState('');
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);
  const { setSelectedAgent } = useAgent();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!pinfl) {
      setError(t('Navbar.AgentsearchPlaceholder'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const agent = await agentService.searchAgentByPinfl(pinfl);
      setSelectedAgent(agent);
    } catch (err) {
      setError(t('Navbar.InvalidPinfl'));
      setSelectedAgent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPinfl('');
    setSelectedAgent(null);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 max-w-[200px]">
          <button
            type="button"
            disabled={loading}
            className="cursor-pointer"
            onClick={handleSearch}
          >
            <UserSearch size={18} />
          </button>
          <input
            type="text"
            value={pinfl}
            onChange={(e) => setPinfl(e.target.value)} 
            placeholder={(t('Navbar.PlaceholderAgentPINFL'))}
            className="outline-none bg-transparent text-sm placeholder:text-gray-400 placeholder:text-[14px] max-w-[120px]"
          />

          <button type="button" disabled={loading} className="cursor-pointer" onClick={handleReset}>
            <X size={15} />
          </button>
        </div>
      </form>
      {error && (
        <div className="alert alert-error">
          <div className="flex gap-2">
            <span className="text-red-500">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};
