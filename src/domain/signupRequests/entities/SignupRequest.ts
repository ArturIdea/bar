export class SignUpRequest {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public pinfl: string,
    public createdAt: Date,
    public status: string,
    public bankType: string,
    public channel: string
  ) {}
}
