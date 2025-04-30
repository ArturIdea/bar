export class Agent {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
    public totalRequests: number,
    public successfulRequests: number,
    public failedRequests: number,
    public dailyAverageSuccessfulRequests: number
  ) {}
}
