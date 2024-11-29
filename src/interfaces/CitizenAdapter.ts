import { Citizen } from '@/domain/citizen/entities/Citizen';

export const CitizenAdapter = {
  toDomain: (rawCitizen: any) => {
    return new Citizen(rawCitizen.id.toString(), rawCitizen.name);
  },
};
