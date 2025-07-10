export type BenefitStatus = {
  userCount: number;
  totalAmount: { priceValue: number };
  averageAmountPerUser: { priceValue: number };
};

export type Statuses = {
  ACTIVE?: BenefitStatus;
  EXPIRED?: BenefitStatus;
  [key: string]: BenefitStatus | undefined;
};

export class BenefitType {
  constructor(
    public id: number,
    public name: {
      qr: string;
      ru: string;
      uzCyrl: string;
      uzLatn: string;
    },
    public amount: number,
    public docOn: Date
  ) {}
}

export class Benefit {
  constructor(
    public benefitType: BenefitType,
    public users: number,
    public statuses?: Statuses // Add statuses field
  ) {}
}
