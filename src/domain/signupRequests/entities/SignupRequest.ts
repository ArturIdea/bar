export class SignUpRequest {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public pinfl: string,
    public phoneNumber: string,
    public createdAt: Date
  ) {}
}
