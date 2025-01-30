import { SignupRequestDetail } from '../entities/SignupRequestDetail';

export interface SignupRequestDetailRepository {
  getSignupRequestDetailById: (id: string) => Promise<SignupRequestDetail>;
}
