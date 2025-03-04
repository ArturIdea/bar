import { Container } from 'inversify';
import {
  loadAgeDistributionMetricsRepositories,
  loadAgeDistributionMetricsUseCases,
} from './modules/AgeDistributionMetrics.module';
import { loadCardMetricsRepositories, loadCardMetricsUseCases } from './modules/CardMetrics.module';
import {
  loadChannelMetricsRepositories,
  loadChannelMetricsUseCases,
} from './modules/ChannelMetrics.module';
import {
  loadSignupMetricsRepositories,
  loadSignupMetricsUseCases,
} from './modules/SignupMetrics.module';
import {
  loadSignupRequestRepositories,
  loadSignupRequestUseCases,
} from './modules/SignupRequest.module';
import {
  loadSignupRequestDetailRepositories,
  loadSignupRequestDetailUseCases,
} from './modules/SignupRequestDetail.module';
import { loadStatisticsRepositories, loadStatisticsUseCases } from './modules/Statistics.module';
import { loadUserDetailsRepositories, loadUserDetailsUseCases } from './modules/UserDetails.module';
import { loadUserMetricsRepositories, loadUserMetricsUseCases } from './modules/UserMetrics.module';
import { loadUserstRepositories, loadUsersUseCases } from './modules/Users.module';

export const diContainer = new Container();

let isDependenciesSetup = false;

export const setupDependencies = () => {
  if (isDependenciesSetup) {
    return;
  }
  isDependenciesSetup = true;

  //repositories
  loadSignupRequestRepositories(diContainer);
  loadSignupRequestDetailRepositories(diContainer);
  loadUserstRepositories(diContainer);
  loadUserDetailsRepositories(diContainer);
  loadStatisticsRepositories(diContainer);
  loadSignupMetricsRepositories(diContainer);
  loadUserMetricsRepositories(diContainer);
  loadChannelMetricsRepositories(diContainer);
  loadCardMetricsRepositories(diContainer);
  loadAgeDistributionMetricsRepositories(diContainer);

  //use cases
  loadSignupRequestUseCases(diContainer);
  loadSignupRequestDetailUseCases(diContainer);
  loadUsersUseCases(diContainer);
  loadUserDetailsUseCases(diContainer);
  loadStatisticsUseCases(diContainer);
  loadSignupMetricsUseCases(diContainer);
  loadUserMetricsUseCases(diContainer);
  loadChannelMetricsUseCases(diContainer);
  loadCardMetricsUseCases(diContainer);
  loadAgeDistributionMetricsUseCases(diContainer);
};
