import React from 'react';
import Image from 'next/image';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';
import { useUserDetail } from '@/ui/hooks/ui/useUserDetail';

interface UserDetailsModalProps {
  userId?: string;
  pinfl?: string;
  onClose: () => void;
  onOpenSignupRequest: (signupRequestId: string) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  userId,
  pinfl,
  onClose,
  onOpenSignupRequest,
}) => {
  const { user, loading, error } = useUserDetail(userId, pinfl);
  const t = useTranslations();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);

  return (
    <div className="z-[999] fixed inset-0 flex items-center justify-end bg-black/30 backdrop-blur-md transition-opacity">
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-lg md:max-w-2xl lg:max-w-3xl  shadow-xl overflow-y-auto h-full"
      >
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
          <div className="flex flex-col justify-between h-full p-10">
            <div>
              <div>
                <h1 className="text-xl">{t('UserManagement.modalTitle')}</h1>
                <button
                  type="button"
                  className="cursor-pointer absolute top-10 right-10 text-gray-500 hover:text-gray-700 transition"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-8 pt-10">
                {user.photoUrl && (
                  <div className="flex justify-center">
                    <Image
                      src={user.photoUrl}
                      width={128}
                      height={128}
                      alt="User Avatar"
                      className="w-28 h-28 rounded-full shadow-md object-cover"
                    />
                  </div>
                )}

                <h2 className="text-2xl font-semibold text-center">
                  {user.firstName} {user.lastName}
                </h2>
              </div>

              <div className="py-10">
                <div className="border-b border-gray-100" />
              </div>

              <div className="h-[35vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.email')}</p>
                    {user.email ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.phone')}</p>{' '}
                    {user.phoneNumber ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.nationality')}</p>{' '}
                    {user.nationalityName ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.citizenship')}</p>{' '}
                    {user.citizenshipName ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.birthCountry')}</p>{' '}
                    {user.birthCountryName ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.dob')}</p>{' '}
                    {user.dateOfBirth ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.socialNumber')}</p>{' '}
                    {user.socialNumber ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.pinfl')}</p>{' '}
                    {user.pinfl ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.address')}</p>{' '}
                    {user.address ?? 'N/A'}
                  </div>
                  <div>
                    <p className="text-gray-400 font-normal">{t('UserManagement.createdAt')}</p>{' '}
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
                  </div>
                </div>

                {/* {user.agentData && (
                  <div className="py-8">
                    <h3 className="pb-2 text-lg text-gray-400 font-semibold">
                      {t('UserManagement.agentData.title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.firstName')}
                        </p>{' '}
                        {user.agentData.firstName ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.lastName')}
                        </p>{' '}
                        {user.agentData.lastName ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.jobTitle')}
                        </p>{' '}
                        {user.agentData.jobTitle ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.dob')}
                        </p>{' '}
                        {user.agentData.dateOfBirth ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.pinfl')}
                        </p>{' '}
                        {user.agentData.pinfl?.id ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.address')}
                        </p>{' '}
                        {user.agentData.address ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.responsiblePerson')}
                        </p>{' '}
                        {user.agentData.responsiblePerson}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.insonCenterDistrict')}
                        </p>{' '}
                        {user.agentData.insonCenterDistrict ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.insonCenterBranchCode')}
                        </p>{' '}
                        {user.agentData.insonCenterBranchCode ?? 'N/A'}
                      </div>
                      {user.agentData.personalPhone && (
                        <div>
                          <p className="text-gray-400 font-normal">
                            {t('UserManagement.agentData.personalPhone')}
                          </p>{' '}
                          {user.agentData.personalPhone.phoneCode}-
                          {user.agentData.personalPhone.phoneNumber}
                        </div>
                      )}
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.personalEmail')}
                        </p>{' '}
                        {user.agentData.personalEmailAddress ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.agreementEmail')}
                        </p>{' '}
                        {user.agentData.agreementEmailAddress ?? 'N/A'}
                      </div>
                      <div>
                        <p className="text-gray-400 font-normal">
                          {t('UserManagement.agentData.location')}
                        </p>{' '}
                        {user.agentData.location ?? 'N/A'}
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
            <div className="flex flex-col gap-12 ">
              <div>
                {user.agentData && (
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-xl font-semibold text-left">
                        {user.agentData.firstName} {user.agentData.lastName}
                      </h1>
                      <h1 className="text-md font-normal text-gray-400">
                        {t('UserManagement.agentData.title')}
                      </h1>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="bg-[#08678e] text-white px-4 py-2 rounded-full  transition cursor-pointer flex items-center gap-1"
                      >
                        {t('Buttons.history')}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {user.signupRequestId && (
                <div className=" text-center ">
                  <button
                    type="button"
                    className="bg-[#08678e] text-white px-4 py-2 rounded-full  transition cursor-pointer"
                    onClick={() =>
                      user.signupRequestId && onOpenSignupRequest(user.signupRequestId)
                    }
                  >
                    {t('Buttons.viewSignupDetails')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
