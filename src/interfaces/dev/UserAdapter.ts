import { User } from '@/domain/users/dev/entities/User';

export const UserAdapter = {
  toDomain(raw: any): User {
    return new User(
      raw.id,
      raw.firstName,
      raw.lastName,
      raw.pinfl,
      raw.socialNumber || 'N/A',
      raw.email || 'N/A',
      raw.phone,
      raw.createdAt
    );
  },
};
