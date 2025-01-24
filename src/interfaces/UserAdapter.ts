import { User } from '@/domain/users/entities/User';

export const UserAdapter = {
  toDomain(raw: any): User {
    let role = 'Unknown';

    if (raw.authorities?.[0] === 'ROLE_ADMIN') {
      role = 'Admin';
    } else if (raw.authorities?.[0] === 'ROLE_AGENT') {
      role = 'Agent';
    } else if (raw.authorities?.[0] === 'ROLE_USER') {
      role = 'User';
    }

    return new User(
      raw.userId,
      raw.username,
      raw.firstName,
      raw.lastName,
      raw.phoneNumber,
      raw.email || 'N/A',
      role,
      raw.createdAt
    );
  },
};
