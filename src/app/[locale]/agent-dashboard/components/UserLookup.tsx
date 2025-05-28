'use client';

import { useState } from 'react';
import { UserProfileDisplay } from './UserProfileDisplay';
import { ApiClient } from '@/core/ApiClient';

interface UserProfile {
  userId: string;
  keycloakUserId: string;
  sdkUserId: string;
  username: string;
  firstName: string;
  lastName: string;
  pinfl: string;
  documentTypeId: string;
  documentNumber: string;
  dateOfBirth: string;
  socialNumber: string;
  identityProviderData: {
    personDataLatin: {
      socialNumber: string;
      genderName: string;
      nationalityName: string;
      citizenshipName: string;
      documentType: string;
      birthDateAsString: string | null;
      birthCountryId: number;
      birthPlace: string;
      birthCountryName: string;
      firstName: string;
      middleName: string;
      lastName: string;
      nationalityId: number;
      citizenshipId: number;
      documentTypeId: number;
      pinfl: string;
      docSeria: string;
      docNumber: string;
      birthOn: string;
      docIssueOn: string;
      docExpireOn: string;
      docIssueOrganization: string;
      genderId: number;
      isDeath: boolean;
      deathOn: string | null;
    };
    marriageData: {
      docNumber: string;
      docOn: string;
      branch: number;
      certSeries: string;
      certNumber: string;
      certDate: string;
      husbandFamily: string;
      husbandFamilyAfter: string;
      husbandFirstName: string;
      husbandPatronym: string;
      husbandBirthDay: string;
      husbandAddress: string | null;
      husbandCitizen: string;
      husbandPinfl: string;
      wifeFamily: string;
      wifeFamilyAfter: string;
      wifeFirstName: string;
      wifePatronym: string;
      wifeBirthDay: string;
      wifeAddress: string | null;
      wifeCitizen: string;
      wifePinfl: string;
    } | null;
    disabilityData: any | null;
  };
  benefits: Array<{
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
      docOn: string;
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
    monthOn: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
  tosAgreementEmail: string | null;
  signupRequestId: string;
  createdBy: any | null;
  agentData: any | null;
  photoUrl: string;
}

const UserLookup = () => {
  const [searchType, setSearchType] = useState<'pnfl' | 'social'>('pnfl');
  const [identifier, setIdentifier] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUserProfile(null);

    if (!identifier || !dateOfBirth) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const data = await ApiClient.shared.get<UserProfile>(
        `/api/agent/user/get-by-id-social-number-and-dob?pinflOrSocialNumber=${identifier}&dateOfBirth=${dateOfBirth}`,
        {
          headers: {
            'accept': 'application/json',
            'Channel-Type': 'HTTP_CLIENT',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ApiClient.shared.getAuthToken()}`,
            'Device-Id': 'b9678877ac543810'
          }
        }
      );
      setUserProfile(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white flex justify-center p-6 mb-6">
        <div className="p-6 mb-6 w-2/3 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">User Lookup</h2>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex space-x-4">
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  searchType === 'pnfl' ? 'bg-[#add9f4] text-gray-800' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSearchType('pnfl')}
              >
                PNFL ID
              </button>
              {/* <button
                type="button"
                className={`px-4 py-2 rounded ${
                  searchType === 'social'
                    ? 'bg-[#add9f4] text-gray-800'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSearchType('social')}
              >
                Social Number
              </button> */}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {searchType === 'pnfl' ? 'PNFL ID' : 'Social Number'}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={searchType === 'pnfl' ? 'Enter PNFL ID' : 'Enter Social Number'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#add9f4] text-gray-800 py-2 px-4 rounded-md hover:bg-[#8bc4e6] transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Searching...
                </div>
              ) : (
                'Search'
              )}
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-gray-600">Searching for user...</p>
        </div>
      )}

      {userProfile && !loading && (
        <div className="mt-6 flex justify-center">
          <UserProfileDisplay userProfile={userProfile} />
        </div>
      )}
    </div>
  );
};

export default UserLookup;
