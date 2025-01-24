import { Statistics } from '../entities/Statistics';

export interface StatisticsRepository {
  getStatistics: () => Promise<Statistics>;
}
