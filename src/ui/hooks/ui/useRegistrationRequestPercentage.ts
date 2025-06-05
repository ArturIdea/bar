/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';

interface RegistrationRequestPercentage {
  classification: string;
  count: number;
  percentage: number;
}

export const useRegistrationRequestPercentage = (fromDate?: string, toDate?: string) => {
  const [data, setData] = useState<RegistrationRequestPercentage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent();

  console.log(selectedAgent?.id)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = `/api/admin/dashboard/metrics/registration-requests-percentage?fromDate=${fromDate}&toDate=${toDate}`;
        const url = selectedAgent?.id ? `${baseUrl}&userId=${selectedAgent.id}` : baseUrl;
        
        const response = await ApiClient.shared.get<RegistrationRequestPercentage[]>(url);
              
        // Validate API response
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
          console.error('Invalid or empty API response received');
          setError('No data available');
          setData([]);
          return;
        }

        // Ensure all required fields are present and have default values
        const transformedData = response.data.map(item => ({
          classification: item.classification || '',
          count: item.count || 0,
          percentage: item.percentage || 0
        }));

        setData(transformedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch registration request percentage data');
        setData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromDate, toDate, selectedAgent?.id]);

  return { data, loading, error };
}; 