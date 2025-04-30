export class User {
  constructor(
    public userId: string,
    public pinfl: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public createdAt: Date
  ) {}
}
