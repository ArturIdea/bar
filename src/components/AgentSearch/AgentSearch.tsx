import React, { FormEvent, useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAgent } from '@/contexts/AgentContext';
import { agentService } from '@/services/agentService';

export const AgentSearch: React.FC = () => {
  const [pinfl, setPinfl] = useState('');
  const [loading, setLoading] = useState(false);
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
      setError('Please enter an Agent PINFL number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const agent = await agentService.searchAgentByPinfl(pinfl);
      setSelectedAgent(agent);
    } catch (err) {
      setError('Invalid PINFL number');
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
        <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
          <input
            type="text"
            value={pinfl}
            onChange={(e) => setPinfl(e.target.value)}
            placeholder="Enter Agent PINFL number"
            className="outline-none bg-transparent text-sm placeholder:text-gray-400 placeholder:text-[14px]"
          />
          <button
            type="button"
            disabled={loading}
            className="cursor-pointer"
            onClick={handleSearch}
          >
            <Search size={15} />
          </button>
          <button type="button" disabled={loading} className="cursor-pointer" onClick={handleReset}>
            {/* <span className='text-[12px] '>Reset</span> */}
            <X size={15} />
          </button>
        </div>
      </form>
      {error && (
        <div className="alert alert-error">
          <div className="flex gap-2">
            <span className='text-red-500'>{error}</span>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
          </div>
        </div>
      )}
    </div>
  );
};
