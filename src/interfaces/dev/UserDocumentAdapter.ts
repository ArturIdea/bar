import { Etag, PhotoKey, Scanned, UserDocument } from '@/domain/users/dev/entities/UserDocument';

export const UserDocumentsAdapter = {
  toDomain(raw: any): UserDocument {
    return new UserDocument(
      raw.id,
      raw.documentNumber,
      raw.documentType,
      raw.name,
      new Scanned(
        new PhotoKey(raw.scanned.key.key, raw.scanned.key.keyAsStr),
        new Etag(raw.scanned.etag.value)
      ),
      raw.scannedUri,
      raw.createdAt,
      raw.documentData
    );
  },

  toDomainList(rawList: any[]): UserDocument[] {
    return rawList.map((raw) => UserDocumentsAdapter.toDomain(raw));
  },
};
