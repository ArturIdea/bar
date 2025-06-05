import React from 'react';
import { useAgent } from '@/contexts/AgentContext';

export const AgentInfo: React.FC = () => {
  const { selectedAgent } = useAgent();
  
  if (!selectedAgent) {
    return (
      <div className="p-4 text-gray-500">
        No agent selected. Please search for an agent using the search box.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Selected Agent</h2>
      <div className="space-y-2">
        <p><span className="font-medium">ID:</span> {selectedAgent.id}</p>
        <p><span className="font-medium">Full Name:</span> {selectedAgent.fullName}</p>
      </div>
    </div>
  );
}; 