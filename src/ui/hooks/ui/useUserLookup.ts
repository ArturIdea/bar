import { useState } from 'react';
import { diContainer } from '@/core/di/setup';
import { GetUserDetailUseCase } from '@/domain/users/useCases/GetUserDetail';

export interface UserLookupProfile {
  username: string;
  firstName: string;
  lastName: string;
  pinfl: string;
  email: string;
  documentTypeId: string;
  documentNumber: string;
  dateOfBirth: string;
  socialNumber: string;
  createdAt: string;
  authorities: string[];
  nationalityName?: string;
  citizenshipName?: string;
  birthCountryName?: string;
  country?: string;
  region?: string;
  district?: string;
  address?: string;
  photoUrl?: string;
  signupRequestId?: string;
  identityProviderData?: {
    personDataLatin?: {
      socialNumber?: string;
      genderName?: string;
      nationalityName?: string;
      citizenshipName?: string;
      birthCountryName?: string;
      documentType?: string;
    };
  };
  agentData?: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    dateOfBirth?: string;
    pinfl?: {
      id?: string;
    };
    insonCenterDistrict?: string;
    insonCenterBranchCode?: string;
    personalPhone?: {
      phoneCode?: string;
      phoneNumber?: string;
    };
    personalEmailAddress?: string;
    agreementEmailAddress?: string;
    address?: string;
    location?: string;
    responsiblePerson?: string;
    mobilePhoneNumbers?: {
      phoneCode?: string;
      phoneNumber?: string;
    }[];
  };
  createdBy?: {
    userId?: string;
    firstName?: string;
    lastName?: string;
    photoUrl?: string;
  };
  benefits?: Array<{
    id: number;
    externalId: string;
    pinfl: string;
    appointedPinfl: string;
    status: string;
    benefitType: {
      id: number;
      name: {
        qr: string;
        ru: string;
        'uz-cyrl': string;
        'uz-latn': string;
      };
      amount: {
        priceValue: number;
      };
      docOn: string | null;
    };
    amount: {
      priceValue: number;
    };
    deductionName: string | null;
    deductionAmount: {
      priceValue: number;
    };
    deductionPercentage: {
      priceValue: number;
    };
    deductionStart: string | null;
    deductionEnd: string | null;
    startedOn: string;
    endedOn: string;
    cancelledOn: string | null;
    monthOn: string;
  }>;
  transactions?: Array<{
    id: string;
    type: string;
    amount: number;
    status: string;
    date: string;
    description?: string;
  }>;
}

export const useUserLookup = () => {
  const [user, setUser] = useState<UserLookupProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (identifier: string, dateOfBirth: string, searchType: 'pnfl' | 'social') => {
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const useCase = diContainer.get<GetUserDetailUseCase>('GetUserDetail');
      // Use the appropriate identifier based on search type
      const userData = await useCase.execute(
        undefined, // userId is undefined since we're searching by PNFL
        searchType === 'pnfl' ? identifier : undefined // Pass PNFL if search type is 'pnfl'
      );

      if (!userData) {
        setError('No user found with the provided information');
        return;
      }

      // Check if the date of birth matches
      if (userData.dateOfBirth !== dateOfBirth) {
        setError('Date of birth does not match');
        return;
      }

      // Map the user data to our profile format
      setUser({
        ...userData,
        createdAt: userData.createdAt || ''
      } as UserLookupProfile);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, searchUser };
}; 