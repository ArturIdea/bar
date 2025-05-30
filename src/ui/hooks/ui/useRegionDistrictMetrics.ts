"use client";

/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '../../../core/ApiClient';

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiClient.shared.get<RegionData>(
          `/api/admin/user/region-district-counts?fromDate=${fromDate}&toDate=${toDate}`
        );
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch region and district metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  return { data, loading, error };
} 