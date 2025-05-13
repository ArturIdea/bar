import { UserCard } from '@/domain/users/entities/UserCard';

export const UserCardAdapter = {
  toDomain(raw: any): UserCard {
    return new UserCard(raw.uri);
  },
};
