import { User } from '@/domain/users/entities/User';

export const UserAdapter = {
  toDomain(raw: any): User {
    return new User(
      raw.userId,
      raw.pinfl,
      raw.username,
      raw.firstName,
      raw.lastName,
      raw.email || 'No Data',
      raw.bankType || 'No Data',
      raw.channel || 'No Data',
      raw.createdAt
    );
  },
};
