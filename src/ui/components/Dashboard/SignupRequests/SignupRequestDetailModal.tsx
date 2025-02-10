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

        {!loading && !error && signupRequest && (
          <div className="text-gray-900">
            <h2 className="text-2xl font-semibold text-center mb-4">Signup Request Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>{t('SignupRequests.name')}:</strong> {signupRequest.firstName}{' '}
                {signupRequest.lastName}
              </p>
              {signupRequest.email && (
                <p>
                  <strong>{t('SignupRequests.email')}:</strong> {signupRequest.email}
                </p>
              )}
              <p>
                <strong>{t('SignupRequests.mobile')}:</strong> {signupRequest.phoneCode}{' '}
                {signupRequest.phoneNumber}
              </p>
              <p>
                <strong>{t('SignupRequests.status')}:</strong> {signupRequest.status}
              </p>
              {signupRequest.nationalityName && (
                <p>
                  <strong>{t('SignupRequests.nationality')}:</strong>{' '}
                  {signupRequest.nationalityName}
                </p>
              )}
              {signupRequest.citizenshipName && (
                <p>
                  <strong>{t('SignupRequests.citizenship')}:</strong>{' '}
                  {signupRequest.citizenshipName}
                </p>
              )}
              <p>
                <strong>{t('SignupRequests.registrationNumber')}:</strong>{' '}
                {signupRequest.registrationNumber}
              </p>
              <p>
                <strong>{t('SignupRequests.docType')}:</strong> {signupRequest.documentType}
              </p>
              <p>
                <strong>{t('SignupRequests.docNumber')}:</strong> {signupRequest.docSeria}{' '}
                {signupRequest.documentNumber}
              </p>
              {signupRequest.docIssueOrganization && (
                <p>
                  <strong>{t('SignupRequests.issuedBy')}:</strong>{' '}
                  {signupRequest.docIssueOrganization}
                </p>
              )}
              {signupRequest.docIssueOn && (
                <p>
                  <strong>{t('SignupRequests.issueDate')}:</strong>{' '}
                  {new Date(signupRequest.docIssueOn).toLocaleDateString()}
                </p>
              )}
              {signupRequest.docExpireOn && (
                <p>
                  <strong>{t('SignupRequests.expiryDate')}:</strong>{' '}
                  {new Date(signupRequest.docExpireOn).toLocaleDateString()}
                </p>
              )}
              <p>
                <strong>{t('SignupRequests.gender')}:</strong> {signupRequest.genderName}
              </p>
              {signupRequest.birthCountryName && (
                <p>
                  <strong>{t('SignupRequests.birthCountry')}:</strong>{' '}
                  {signupRequest.birthCountryName}
                </p>
              )}
              {signupRequest.address && (
                <p>
                  <strong>{t('SignupRequests.address')}:</strong> {signupRequest.address}
                </p>
              )}
              <p>
                <strong>{t('SignupRequests.createdAt')}:</strong>{' '}
                {new Date(signupRequest.createdAt).toLocaleString()}
              </p>
              {signupRequest.finalizedAt && (
                <p>
                  <strong>{t('SignupRequests.finalizedAt')}:</strong>{' '}
                  {new Date(signupRequest.finalizedAt).toLocaleString()}
                </p>
              )}
              <p>
                <strong>{t('SignupRequests.termsOfServices')}:</strong>{' '}
                {signupRequest.tosAccepted
                  ? t('SignupRequests.accepted')
                  : t('SignupRequests.rejected')}
              </p>
              <p>
                <strong>Privacy Policy:</strong>{' '}
                {signupRequest.privacyPolicyAccepted
                  ? t('SignupRequests.accepted')
                  : t('SignupRequests.rejected')}
              </p>
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
