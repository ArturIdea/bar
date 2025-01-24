export class User {
  constructor(
    public userId: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public email: string,
    public role: string,
    public createdAt: Date
  ) {}
}
