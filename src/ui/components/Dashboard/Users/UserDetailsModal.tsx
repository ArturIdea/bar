import React from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUserDetail } from '@/ui/hooks/ui/useUserDetail';

interface UserDetailsModalProps {
  userId: string;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ userId, onClose }) => {
  const { user, loading, error } = useUserDetail(userId);
  const t = useTranslations();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md transition-opacity">
      <div className="relative bg-white w-full max-w-lg md:max-w-2xl lg:max-w-3xl p-6 rounded-xl shadow-xl overflow-y-auto max-h-[80vh]">
        <button
          type="button"
          className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {!loading && !error && user && (
          <div className="text-gray-900">
            {user.photoUrl && (
              <div className="flex justify-center mb-6">
                <Image
                  src={user.photoUrl}
                  width={128}
                  height={128}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full shadow-md object-cover"
                />
              </div>
            )}

            <h2 className="text-2xl font-semibold text-center mb-2">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-center text-gray-500 mb-4">@{user.username}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>{t('UserRegistration.name')}:</strong> {user.email ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.phone')}:</strong> {user.phoneNumber ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.nationality')}:</strong>{' '}
                {user.nationalityName ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.citizenship')}:</strong>{' '}
                {user.citizenshipName ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.birthCountry')}:</strong>{' '}
                {user.birthCountryName ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.dob')}:</strong> {user.dateOfBirth ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.socialNumber')}:</strong> {user.socialNumber ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.pinfl')}:</strong> {user.pinfl ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.address')}:</strong> {user.address ?? 'N/A'}
              </p>
              <p>
                <strong>{t('UserRegistration.createdAt')}:</strong>{' '}
                {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
              </p>
            </div>

            {user.agentData && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold">{t('UserRegistration.agentData.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>{t('UserRegistration.agentData.firstName')}:</strong>{' '}
                    {user.agentData.firstName ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.lastName')}:</strong>{' '}
                    {user.agentData.lastName ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.jobTitle')}:</strong>{' '}
                    {user.agentData.jobTitle ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.dob')}:</strong>{' '}
                    {user.agentData.dateOfBirth ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.pinfl')}:</strong>{' '}
                    {user.agentData.pinfl?.id ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.address')}:</strong>{' '}
                    {user.agentData.address ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.responsiblePerson')}:</strong>{' '}
                    {user.agentData.responsiblePerson}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.insonCenterDistrict')}:</strong>{' '}
                    {user.agentData.insonCenterDistrict ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.insonCenterBranchCode')}</strong>{' '}
                    {user.agentData.insonCenterBranchCode ?? 'N/A'}
                  </p>
                  {user.agentData.personalPhone && (
                    <p>
                      <strong>{t('UserRegistration.agentData.personalPhone')}:</strong>{' '}
                      {user.agentData.personalPhone.phoneCode}-
                      {user.agentData.personalPhone.phoneNumber}
                    </p>
                  )}
                  <p>
                    <strong>{t('UserRegistration.agentData.personalEmail')}:</strong>{' '}
                    {user.agentData.personalEmailAddress ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.agreementEmail')}:</strong>{' '}
                    {user.agentData.agreementEmailAddress ?? 'N/A'}
                  </p>
                  <p>
                    <strong>{t('UserRegistration.agentData.location')}:</strong>{' '}
                    {user.agentData.location ?? 'N/A'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
