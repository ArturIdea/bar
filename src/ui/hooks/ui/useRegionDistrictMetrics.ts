"use client";

/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';
import { useBankFilterStore } from '@/ui/stores/useBankFilterStore';
import { useAppTypeFilterStore } from '@/ui/stores/useAppTypeFilterStore';

export interface District {
  district: string;
  userCount: number;
}

export interface Region {
  region: string;
  regionUserCount: number;
  districts: District[];
}

export interface RegionData extends Array<Region> {}

export function useRegionDistrictMetrics(fromDate: string, toDate: string) {
  const [data, setData] = useState<RegionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedAgent } = useAgent(); 
  const selectedBank = useBankFilterStore((state) => state.selectedBank);
  const selectedAppType = useAppTypeFilterStore((state) => state.selectedAppType);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = `/api/admin/user/region-district-counts?fromDate=${fromDate}&toDate=${toDate}`;
        let url = baseUrl;
        if (selectedAgent?.id) {
          url += `&userId=${selectedAgent.id}`;
        }
        if (selectedBank) {
          url += `&bankType=${selectedBank}`;
        }
        if (selectedAppType) {
          url += `&onboardingChannel=${selectedAppType}`;
        }
        
        const response = await ApiClient.shared.get<RegionData>(url);
        const modifiedData = response.data.map(region => ({
          ...region,
          region: region.region || 'No region added',
        }));
        setData(modifiedData);
      } catch (err) {
        setError('Failed to fetch region and district metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromDate, toDate, selectedAgent?.id, selectedBank,selectedAppType]);

  return { data, loading, error };
} 