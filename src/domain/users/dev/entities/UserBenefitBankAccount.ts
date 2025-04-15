export class UserBenefitBankAccount {
  constructor(
    public id: number,
    public benefitTypeId: number,
    public masterBankAccountNumber: string,
    public subBankAccountNumber: string,
    public branchCode: BranchCode,
    public bankCode: string,
    public createdAt: string
  ) {}
}

export class BranchCode {
  constructor(public value: string) {}
}
