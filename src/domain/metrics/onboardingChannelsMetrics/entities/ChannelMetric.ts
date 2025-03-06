export class ChannelMetric {
  constructor(
    public channels: Record<string, { Total: number; Failed: number; Success: number }>
  ) {}
}
