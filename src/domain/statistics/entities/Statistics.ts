export class Statistics {
  constructor(
    public newAccountsSince: number,
    public newFundsDisbursedSince: number,
    public cardsIssuedSince: number,
    public requestsSince: number,
    public successfulRequestsSince: number,
    public failedRequestsSince: number
  ) {}
}
