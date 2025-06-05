"use client";

/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';
import { useAgent } from '@/contexts/AgentContext';

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = `/api/admin/user/region-district-counts?fromDate=${fromDate}&toDate=${toDate}`;
        const url = selectedAgent?.id ? `${baseUrl}&userId=${selectedAgent.id}` : baseUrl;
        
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
  }, [fromDate, toDate, selectedAgent?.id]);

  return { data, loading, error };
} 