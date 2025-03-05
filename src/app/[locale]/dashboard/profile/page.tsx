'use client';

import Image from 'next/image';
import { useUserProfile } from '@/ui/hooks/ui/useUserProfile';

export default function ProfilePage() {
  const { userProfile, loading } = useUserProfile();

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  if (!userProfile) {
    return <div className="text-center py-10 text-lg text-red-400">User data not available.</div>;
  }

  return (
    <div>
      {/* Profile Header */}
      <div className="flex items-center gap-6 border-b border-gray-200 p-6">
        <Image
          src="/default-avatar.png"
          width={120}
          height={120}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border border-gray-300"
        />
        <div>
          <h1 className="text-2xl font-semibold">
            {userProfile.firstName} {userProfile.lastName}
          </h1>
          {/* <p className="font-semibold text-3xl">Ya’qub Shahzodbek</p> */}
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="p-6">
        <h2 className="text-xl font-normal">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 mt-6">
          {/* Left Column */}
          <div>
            <p className="text-sm text-gray-400">First name</p>
            <p className="text-lg font-normal ">{userProfile.firstName || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Last Name</p>
            <p className="text-lg font-normal">{userProfile.lastName || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Patronym</p>
            <p className="text-lg font-normal">
              {userProfile.identityProviderData?.personDataLatin?.middleName || '-'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Birth date</p>
            <p className="text-lg font-normal">{userProfile.dateOfBirth || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Job Title</p>
            <p className="text-lg font-normal">{userProfile.agentData?.jobTitle || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">PINFL</p>
            <p className="text-lg font-normal">{userProfile.pinfl || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">District of Inson Center</p>
            <p className="text-lg font-normal">
              {userProfile.agentData?.insonCenterDistrict || '-'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Branch Code of "Inson Center"</p>
            <p className="text-lg font-normal">
              {userProfile.agentData?.insonCenterBranchCode || '-'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Phone Number</p>
            <p className="text-lg font-normal">{userProfile.phoneNumber || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Personal Email Address</p>
            <p className="text-lg font-normal">
              {userProfile.agentData?.personalEmailAddress || '-'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Username</p>
            {/* <p className="text-lg font-normal">{userProfile.username || "-"}</p> */}
          </div>

          <div>
            <p className="text-sm text-gray-400">Print Email Address</p>
            {/* <p className="text-lg font-normal">{userProfile.tosAgreementEmail || "-"}</p> */}
          </div>

          <div>
            <p className="text-sm text-gray-400">Address</p>
            {/* <p className="text-lg font-normal">{userProfile.agentData?.address || "-"}</p> */}
          </div>

          <div>
            <p className="text-sm text-gray-400">Password</p>
            <p className="text-lg font-normal">******</p>
          </div>
        </div>
      </div>
    </div>
  );
}
