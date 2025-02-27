export class SignupMetric {
  constructor(
    public id: number,
    public date: string,
    public totalSignupRequests: number,
    public failedSignupRequests: number,
    public successfulSignupRequests: number
  ) {}
}
