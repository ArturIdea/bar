export class UserDevice {
  constructor(
    public id: number,
    public deviceId: string,
    public manufacturer: string,
    public model: string,
    public platform: string,
    public osVersion: string,
    public active: boolean,
    public createdAt: string,
    public lastActivity: string
  ) {}
}
