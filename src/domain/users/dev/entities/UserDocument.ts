export class UserDocument {
  constructor(
    public id: string,
    public documentNumber: string,
    public documentType: string,
    public name: string,
    public scanned: Scanned,
    public scannedUri: string,
    public createdAt: string,
    public documentData: any
  ) {}
}

export class Scanned {
  constructor(
    public key: PhotoKey,
    public etag: Etag
  ) {}
}

export class PhotoKey {
  constructor(
    public key: string,
    public keyAsStr: string
  ) {}
}

export class Etag {
  constructor(public value: string) {}
}
