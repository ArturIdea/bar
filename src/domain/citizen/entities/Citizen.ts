export class Citizen {
  constructor(
    public id: string,
    public name: string
  ) {}

  toJson() {
    return {
      id: this.id,
      name: this.name,
    } as Citizen;
  }
}
