export class User {
  constructor(
    public userId: string,
    public pinfl: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public bankType: string,
    public channel: string,
    public createdAt: Date
  ) {}
}
