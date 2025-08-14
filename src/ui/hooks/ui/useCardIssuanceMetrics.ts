/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

interface CardIssuanceMetrics {
  totalOnboardedBeneficiaries: number;
  cardsPrinted: number;
  cardsPrintedPercentage: number;
  cardsPendingPrinting: number;
  cardsPendingPrintingPercentage: number;
  usersWithNoCardIssued: number;
  usersWithNoCardIssuedPercentage: number;
}

export const useCardIssuanceMetrics = (fromDate?: string, toDate?: string) => {
  const [metrics, setMetrics] = useState<CardIssuanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent();
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = `/api/admin/cards-issuance-overview?fromDate=${fromDate}&toDate=${toDate}`;
        let url = selectedAgent?.id 
          ? `${baseUrl}&userId=${selectedAgent.id}`
          : baseUrl;
        
        url = selectedBank ? `${url}&bankType=${selectedBank}` : url;
        url = selectedAppType ? `${url}&onboardingChannel=${selectedAppType}` : url;
        
        const response = await ApiClient.shared.get<CardIssuanceMetrics>(url);
        
        if (!response.data) {
          throw new Error('No data received from the API');
        }

        setMetrics(response.data);
      } catch (err) {
        console.error('Error fetching card issuance metrics:', err);
        setError('Failed to fetch card issuance metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [fromDate, toDate, selectedAgent?.id, selectedBank, selectedAppType]);

  return { metrics, loading, error };
};
