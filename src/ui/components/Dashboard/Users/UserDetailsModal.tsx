import React from 'react';
import Image from 'next/image';
import { useUserDetail } from '@/ui/hooks/ui/useUserDetail';

interface UserDetailsModalProps {
  userId: string;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ userId, onClose }) => {
  const { user, loading, error } = useUserDetail(userId);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex justify-center items-center">
        <div className="bg-white w-[50vw] h-[80vh] rounded-lg p-6 overflow-y-auto shadow-lg relative">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
          Error: {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex justify-center items-center">
        <div className="bg-white w-11/12 h-[90vh] rounded-lg p-6 overflow-y-auto shadow-lg relative">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-xl font-bold">User Not Found</h2>
          <p className="text-gray-500">No user details available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex justify-center items-center">
      <div className="bg-white w-[50vw] h-[80vh] rounded-xl p-6 overflow-y-auto shadow-lg relative">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        {user.photoUrl && (
          <Image
            src={user.photoUrl}
            width="128"
            height="128"
            alt="User"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        )}

        <h2 className="text-xl font-bold text-center mb-4">
          {user.firstName} {user.lastName}
        </h2>

        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email ?? 'N/A'}
        </p>
        <p>
          <strong>Phone:</strong> {user.phoneNumber ?? 'N/A'}
        </p>
        <p>
          <strong>Document Type ID:</strong> {user.documentTypeId ?? 'N/A'}
        </p>
        <p>
          <strong>Document Number:</strong> {user.documentNumber ?? 'N/A'}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dateOfBirth ?? 'N/A'}
        </p>
        <p>
          <strong>Social Number:</strong> {user.socialNumber ?? 'N/A'}
        </p>
        <p>
          <strong>Nationality:</strong> {user.nationalityName ?? 'N/A'}
        </p>
        <p>
          <strong>Citizenship:</strong> {user.citizenshipName ?? 'N/A'}
        </p>
        <p>
          <strong>Birth Country:</strong> {user.birthCountryName ?? 'N/A'}
        </p>
        <p>
          <strong>Address:</strong> {user.address ?? 'N/A'}, {user.district ?? 'N/A'},{' '}
          {user.region ?? 'N/A'}, {user.country ?? 'N/A'}
        </p>
        <p>
          <strong>Authority:</strong> {user.authorities?.join(', ') ?? 'N/A'}
        </p>
        <p>
          <strong>Created At:</strong>{' '}
          {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
        </p>

        {user.agentData && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Agent Data</h3>
            <p>
              <strong>First Name:</strong> {user.agentData.firstName ?? 'N/A'}
            </p>
            <p>
              <strong>Last Name:</strong> {user.agentData.lastName ?? 'N/A'}
            </p>
            <p>
              <strong>Job Title:</strong> {user.agentData.jobTitle ?? 'N/A'}
            </p>
            <p>
              <strong>Date of Birth:</strong> {user.agentData.dateOfBirth ?? 'N/A'}
            </p>

            {/* Fixed PINFL rendering */}
            {user.agentData?.pinfl && (
              <p>
                <strong>PINFL:</strong> {String(user.agentData.pinfl.id)}
              </p>
            )}

            <p>
              <strong>Inson Center District:</strong> {user.agentData.insonCenterDistrict ?? 'N/A'}
            </p>
            <p>
              <strong>Inson Center Branch Code:</strong>{' '}
              {user.agentData.insonCenterBranchCode ?? 'N/A'}
            </p>

            {user.agentData.personalPhone && (
              <p>
                <strong>Personal Phone:</strong> {user.agentData.personalPhone.phoneCode}-
                {user.agentData.personalPhone.phoneNumber}
              </p>
            )}

            <p>
              <strong>Personal Email Address:</strong>{' '}
              {user.agentData.personalEmailAddress ?? 'N/A'}
            </p>
            <p>
              <strong>Agreement Email Address:</strong>{' '}
              {user.agentData.agreementEmailAddress ?? 'N/A'}
            </p>
            <p>
              <strong>Address:</strong> {user.agentData.address ?? 'N/A'}
            </p>
            <p>
              <strong>Location:</strong> {user.agentData.location ?? 'N/A'}
            </p>
            <p>
              <strong>Responsible Person:</strong> {user.agentData.responsiblePerson ?? 'N/A'}
            </p>

            {user.agentData.mobilePhoneNumbers && user.agentData.mobilePhoneNumbers.length > 0 && (
              <div>
                <h4 className="text-md font-semibold mt-2">Mobile Phone Numbers</h4>
                {user.agentData.mobilePhoneNumbers.map((phone, index) => (
                  <p key={index}>
                    <strong>Phone {index + 1}:</strong> {phone.phoneCode}-{phone.phoneNumber}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
