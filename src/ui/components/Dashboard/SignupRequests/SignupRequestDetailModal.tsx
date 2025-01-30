import React from 'react';
import { Loader2 } from 'lucide-react';
import { useSignupRequestDetail } from '@/ui/hooks/ui/useSignupRequestDetail';

interface SignupRequestDetailModalProps {
  id: string | null;
  onClose: () => void;
}

const SignupRequestDetailModal: React.FC<SignupRequestDetailModalProps> = ({ id, onClose }) => {
  const { signupRequest, loading, error } = useSignupRequestDetail(id);

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
            <p className="text-gray-600 mt-2">Loading signup request details...</p>
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
                <strong>Name:</strong> {signupRequest.firstName} {signupRequest.lastName}
              </p>
              {signupRequest.email && (
                <p>
                  <strong>Email:</strong> {signupRequest.email}
                </p>
              )}
              <p>
                <strong>Phone:</strong> {signupRequest.phoneCode} {signupRequest.phoneNumber}
              </p>
              <p>
                <strong>Status:</strong> {signupRequest.status}
              </p>
              {signupRequest.nationalityName && (
                <p>
                  <strong>Nationality:</strong> {signupRequest.nationalityName}
                </p>
              )}
              {signupRequest.citizenshipName && (
                <p>
                  <strong>Citizenship:</strong> {signupRequest.citizenshipName}
                </p>
              )}
              <p>
                <strong>Registration Number:</strong> {signupRequest.registrationNumber}
              </p>
              <p>
                <strong>Document Type:</strong> {signupRequest.documentType}
              </p>
              <p>
                <strong>Document Number:</strong> {signupRequest.docSeria}{' '}
                {signupRequest.documentNumber}
              </p>
              {signupRequest.docIssueOrganization && (
                <p>
                  <strong>Issued By:</strong> {signupRequest.docIssueOrganization}
                </p>
              )}
              {signupRequest.docIssueOn && (
                <p>
                  <strong>Issue Date:</strong>{' '}
                  {new Date(signupRequest.docIssueOn).toLocaleDateString()}
                </p>
              )}
              {signupRequest.docExpireOn && (
                <p>
                  <strong>Expiry Date:</strong>{' '}
                  {new Date(signupRequest.docExpireOn).toLocaleDateString()}
                </p>
              )}
              <p>
                <strong>Gender:</strong> {signupRequest.genderName}
              </p>
              {signupRequest.birthCountryName && (
                <p>
                  <strong>Birth Country:</strong> {signupRequest.birthCountryName}
                </p>
              )}
              {signupRequest.address && (
                <p>
                  <strong>Address:</strong> {signupRequest.address}
                </p>
              )}
              <p>
                <strong>Created At:</strong> {new Date(signupRequest.createdAt).toLocaleString()}
              </p>
              {signupRequest.finalizedAt && (
                <p>
                  <strong>Finalized At:</strong>{' '}
                  {new Date(signupRequest.finalizedAt).toLocaleString()}
                </p>
              )}
              <p>
                <strong>Terms of Service:</strong>{' '}
                {signupRequest.tosAccepted ? 'Accepted' : 'Not Accepted'}
              </p>
              <p>
                <strong>Privacy Policy:</strong>{' '}
                {signupRequest.privacyPolicyAccepted ? 'Accepted' : 'Not Accepted'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupRequestDetailModal;
