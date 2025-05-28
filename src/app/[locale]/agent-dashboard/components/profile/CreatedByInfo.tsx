import { useState } from 'react';
import { HistoryModal } from './HistoryModal';

interface CreatedByInfoProps {
  createdBy: {
    userId: string;
    keycloakUserId: string;
    sdkUserId: string | null;
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
        firstName: string;
        lastName: string;
        pinfl: string;
        docNumber: string;
        birthOn: string;
      };
    };
    createdAt: string;
    updatedAt: string;
    photoUrl: string;
    agentData?: {
      firstName: string;
      lastName: string;
      jobTitle: string;
      insonCenterDistrict: string;
      insonCenterBranchCode: string;
      agreementEmailAddress: string;
    } | null;
  } | null;
}

export const CreatedByInfo = ({ createdBy }: CreatedByInfoProps) => {
  const [showHistory, setShowHistory] = useState(false);

  if (!createdBy) {
    return (
      <div className="bg-white p-6 text-center">
        <p className="text-gray-500">No creator information available</p>
      </div>
    );
  }

  const fullName = `${createdBy.firstName} ${createdBy.lastName}`;
  const personData = createdBy.identityProviderData.personDataLatin;

  return (
    <div className="bg-white p-6">
      <div className="flex items-start justify-between mb-6">
        {/* Image and Name */}
        <div className="flex items-start gap-4">
          {createdBy.photoUrl && (
            <img
              src={createdBy.photoUrl}
              alt={fullName}
              className="w-16 h-16 object-cover border rounded-full"
              crossOrigin="anonymous"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold">{fullName}</h3>
          </div>
        </div>

        {/* History button */}
        <button
          type="button"
          onClick={() => setShowHistory(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[40px] bg-[#08678E] text-white hover:bg-[#064d66] transition-colors"
        >
          <span className="font-medium">History</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Document Number</p>
            <p className="font-medium">{personData.docNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{personData.birthOn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-medium">{new Date(createdBy.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {createdBy.agentData && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Job Title</p>
              <p className="font-medium">{createdBy.agentData.jobTitle || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">District</p>
              <p className="font-medium">{createdBy.agentData.insonCenterDistrict}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Branch Code</p>
              <p className="font-medium">{createdBy.agentData.insonCenterBranchCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{createdBy.agentData.agreementEmailAddress}</p>
            </div>
          </div>
        )}
      </div>

      {showHistory && (
        <div className="mt-6">
          <HistoryModal
            createdById={createdBy.userId}
            onBack={() => setShowHistory(false)}
          />
        </div>
      )}
    </div>
  );
};
