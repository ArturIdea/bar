import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';
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
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(handleClose);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // match transition duration
  }

  if (!id) {
    return null;
  }

  const RequestInfoSection = ({ signupRequest, t }: { signupRequest: any; t: any }) => {
    const fields = [
      { key: 'name', value: `${signupRequest.firstName} ${signupRequest.lastName}` },
      { key: 'email', value: signupRequest.email },
      { key: 'status', value: signupRequest.status },
      { key: 'nationality', value: signupRequest.nationalityName },
      { key: 'citizenship', value: signupRequest.citizenshipName },
      { key: 'registrationNumber', value: signupRequest.registrationNumber },
      { key: 'docType', value: signupRequest.documentType },
      { key: 'docNumber', value: `${signupRequest.docSeria} ${signupRequest.documentNumber}` },
      { key: 'issuedBy', value: signupRequest.docIssueOrganization },
      {
        key: 'issueDate',
        value: signupRequest.docIssueOn
          ? new Date(signupRequest.docIssueOn).toLocaleDateString()
          : null,
      },
      {
        key: 'expiryDate',
        value: signupRequest.docExpireOn
          ? new Date(signupRequest.docExpireOn).toLocaleDateString()
          : null,
      },
      { key: 'gender', value: signupRequest.genderName },
      { key: 'birthCountry', value: signupRequest.birthCountryName },
      { key: 'createdAt', value: new Date(signupRequest.createdAt).toLocaleString() },
      {
        key: 'finalizedAt',
        value: signupRequest.finalizedAt
          ? new Date(signupRequest.finalizedAt).toLocaleString()
          : null,
      },
      {
        key: 'termsOfServices',
        value: signupRequest.tosAccepted
          ? t('SignupRequests.accepted')
          : t('SignupRequests.rejected'),
      },
      {
        key: 'privacyPolicy',
        value: signupRequest.privacyPolicyAccepted
          ? t('SignupRequests.accepted')
          : t('SignupRequests.rejected'),
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm overflow-y-auto h-[50vh]">
        {fields
          .filter((field) => field.value !== undefined && field.value !== null)
          .map(({ key, value }) => (
            <div key={key}>
              <p className="text-gray-400 font-normal">{t(`SignupRequests.${key}`)}</p>
              {value}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className={`z-[999] fixed inset-0 flex items-center justify-end bg-[rgba(11,11,34,0.4)] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        ref={modalRef}
        className={`relative bg-white w-full max-w-3xl shadow-xl overflow-y-auto h-full p-10 transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Signup Request Details */}
        {!loading && !error && signupRequest && (
          <div className="h-full flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl">{t('SignupRequests.title3')}</h1>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={handleClose}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="border-b my-10" />

              {/* Signup Request Information */}
              <RequestInfoSection signupRequest={signupRequest} t={t} />
            </div>

            {/* View User Details Button */}
            {signupRequest.status === 'COMPLETED' && signupRequest.pinfl && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-full transition cursor-pointer"
                  onClick={() => {
                    handleClose();
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
