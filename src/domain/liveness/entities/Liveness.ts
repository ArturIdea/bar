export class Liveness {
  constructor(
    public instanceName: string,
    public lastCheckedAt: Date,
    public status: string
  ) {}
}
