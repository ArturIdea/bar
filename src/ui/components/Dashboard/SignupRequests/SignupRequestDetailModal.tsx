import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSignupRequestDetail } from '@/ui/hooks/ui/useSignupRequestDetail';

interface SignupRequestDetailModalProps {
  id: string | null;
  onClose: () => void;
  onOpenUserDetails: (pinfl: string) => void;
}

const SignupRequestDetailModal: React.FC<SignupRequestDetailModalProps> = ({
  id,
  onClose,
  onOpenUserDetails,
}) => {
  const { signupRequest, loading, error } = useSignupRequestDetail(id);
  const t = useTranslations();

  if (!id) {
    return null;
  }

  return (
    <div className="z-[999] fixed inset-0 flex items-center justify-end bg-black/30 backdrop-blur-md transition-opacity">
      <div className="relative bg-white w-full max-w-lg md:max-w-2xl lg:max-w-3xl  shadow-xl overflow-y-auto h-full">
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

        {!loading && !error && signupRequest && (
          <div className="flex flex-col justify-between h-full p-10">
            <div>
              <div>
                <div className="text-xl">Signup Request Details</div>
                <button
                  type="button"
                  className="cursor-pointer absolute top-10 right-10 text-gray-500 hover:text-gray-700 transition"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="py-10">
                <div className="border-b border-gray-100" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-400 font-normal">{t('SignupRequests.name')}</p>{' '}
                  {signupRequest.firstName} {signupRequest.lastName}
                </div>
                {signupRequest.email && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.email')}</p>{' '}
                    {signupRequest.email}
                  </div>
                )}
                <div>
                  <p className="text-gray-400 font-normal">{t('SignupRequests.mobile')}</p>{' '}
                  {signupRequest.phoneCode} {signupRequest.phoneNumber}
                </div>
                <div>
                  <p className="text-gray-400 font-normal">{t('SignupRequests.status')}</p>{' '}
                  {signupRequest.status}
                </div>
                {signupRequest.nationalityName && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.nationality')}</p>{' '}
                    {signupRequest.nationalityName}
                  </div>
                )}
                {signupRequest.citizenshipName && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.citizenship')}</p>{' '}
                    {signupRequest.citizenshipName}
                  </div>
                )}
                <div>
                  <p className="text-gray-400 font-normal">
                    {t('SignupRequests.registrationNumber')}
                  </p>{' '}
                  {signupRequest.registrationNumber}
                </div>
                <div>
                  <p className="text-gray-400 font-normal">{t('SignupRequests.docType')}</p>{' '}
                  {signupRequest.documentType}
                </div>
                <div>
                  <p className="text-gray-400 font-normal">{t('SignupRequests.docNumber')}</p>{' '}
                  {signupRequest.docSeria} {signupRequest.documentNumber}
                </div>
                {signupRequest.docIssueOrganization && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.issuedBy')}</p>{' '}
                    {signupRequest.docIssueOrganization}
                  </div>
                )}
                {signupRequest.docIssueOn && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.issueDate')}</p>{' '}
                    {new Date(signupRequest.docIssueOn).toLocaleDateString()}
                  </div>
                )}
                {signupRequest.docExpireOn && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.expiryDate')}</p>{' '}
                    {new Date(signupRequest.docExpireOn).toLocaleDateString()}
                  </div>
                )}
                <div>
                  <p className="text-gray-400 font-normal">{t('SignupRequests.gender')}:</p>{' '}
                  {signupRequest.genderName}
                </div>
                {signupRequest.birthCountryName && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.birthCountry')}</p>{' '}
                    {signupRequest.birthCountryName}
                  </div>
                )}
                {signupRequest.address && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.address')}</p>{' '}
                    {signupRequest.address}
                  </div>
                )}
                <div>
                  <p className="text-gray-400 font-normal">{t('SignupRequests.createdAt')}</p>{' '}
                  {new Date(signupRequest.createdAt).toLocaleString()}
                </div>
                {signupRequest.finalizedAt && (
                  <div>
                    <p className="text-gray-400 font-normal">{t('SignupRequests.finalizedAt')}</p>{' '}
                    {new Date(signupRequest.finalizedAt).toLocaleString()}
                  </div>
                )}
                <div>
                  <p className="text-gray-400 font-normal">{t('SignupRequests.termsOfServices')}</p>{' '}
                  {signupRequest.tosAccepted
                    ? t('SignupRequests.accepted')
                    : t('SignupRequests.rejected')}
                </div>
                <div>
                  <p className="text-gray-400 font-normal">Privacy Policy</p>{' '}
                  {signupRequest.privacyPolicyAccepted
                    ? t('SignupRequests.accepted')
                    : t('SignupRequests.rejected')}
                </div>
              </div>
            </div>
            {signupRequest.status === 'COMPLETED' && signupRequest.pinfl && (
              <div className="mt-6 text-center ">
                <button
                  type="button"
                  className="bg-[#08678e] text-white px-4 py-2 rounded-full  transition cursor-pointer"
                  onClick={() => {
                    onClose();
                    onOpenUserDetails(signupRequest.pinfl);
                  }}
                >
                  {t('Buttons.viewUserDetails')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupRequestDetailModal;
