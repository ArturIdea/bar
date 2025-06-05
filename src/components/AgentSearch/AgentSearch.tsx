/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FormEvent, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useAgent } from '@/contexts/AgentContext';
import { agentService } from '@/services/agentService';

export const AgentSearch: React.FC = () => {
  const [pinfl, setPinfl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedAgent } = useAgent();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!pinfl) {
      setError('Please enter a PINFL number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const agent = await agentService.searchAgentByPinfl(pinfl);
      setSelectedAgent(agent);
    } catch (err) {
      setError('Failed to find agent. Please check the PINFL number.');
      setSelectedAgent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPinfl('');
    setSelectedAgent(null);
    setError(null);
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
        <input
          type="text"
          value={pinfl}
          onChange={(e) => setPinfl(e.target.value)}
          placeholder="Enter PINFL number"
          className="outline-none bg-transparent text-sm placeholder:text-gray-400 placeholder:text-[14px]"
        />
        <button type="button" disabled={loading} className="cursor-pointer" onClick={handleSearch}>
          <Search size={15} />
        </button>
        <button
          type="button"
          disabled={loading}
          className="cursor-pointer"
          onClick={handleReset}
        >
          {/* <span className='text-[12px] '>Reset</span> */}
          <X size={15} />
        </button>
      </div>
    </form>
  );
};
