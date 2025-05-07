export class Liveness {
  constructor(
    public instanceName: string,
    public lastCheckedAt: Date,
    public uptime: number,
    public status: string
  ) {}
}
