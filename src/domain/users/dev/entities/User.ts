export class User {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
    public pinfl: string,
    public socialNumber: string,
    public email: string,
    public phoneNumber: string,
    public createdAt: Date
  ) {}
}
