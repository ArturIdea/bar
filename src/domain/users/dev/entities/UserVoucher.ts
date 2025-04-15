export class UserVoucher {
  constructor(
    public id: number,
    public amount: number,
    public promoCode: string,
    public marketPlaceId: string,
    public marketPlace: string,
    public mxikCode: string,
    public classificatorCode: string,
    public classificatorName: string,
    public givenAt: string,
    public usedAt: string
  ) {}
}
