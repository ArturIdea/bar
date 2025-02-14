import { Container } from 'inversify';
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

  //use cases
  loadSignupRequestUseCases(diContainer);
  loadSignupRequestDetailUseCases(diContainer);
  loadUsersUseCases(diContainer);
  loadUserDetailsUseCases(diContainer);
  loadStatisticsUseCases(diContainer);
};
