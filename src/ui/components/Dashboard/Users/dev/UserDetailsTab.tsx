import React from 'react';
import { UserDetail } from '@/domain/users/dev/entities/UserDetail';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6 bg-white rounded-lg shadow p-4 border border-gray-100">
    <h3 className="text-lg font-semibold mb-3 text-primary border-b pb-2">{title}</h3>
    <div className="grid grid-cols-3 gap-6">{children}</div>
  </div>
);

const DetailItem = ({
  label,
  value,
  title,
}: {
  label: string;
  value?: string | number | boolean;
  title?: string;
}) => (
  <div className="mb-2 text-gray-500">
    <p className="text-sm font-medium">{label}</p>
    <p title={title ? title.toString() : ''} className="text-base">
      {value !== undefined && value !== null ? value.toString() : '—'}
    </p>
  </div>
);

export default function UserDetailsTab({ user }: { user: UserDetail }) {
  const latin = user.identityProviderData?.personDataLatin;
  const marriage = user.identityProviderData?.marriageData;
  const disability = user.identityProviderData?.disabilityData;
  const agent = user.agentData;
  const student = user.studentData;

  return (
    <div className="bg-gray-50 p-6 rounded-lg max-h-screen overflow-y-auto">
      {/* User Header */}

      {/* Two-column layout for sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Section title="Basic Information">
            <DetailItem label="Username" value={user.username} />
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Phone Number" value={user.phoneNumber} />
            <DetailItem label="Date of Birth" value={user.dateOfBirth} />
            <DetailItem label="PINFL" value={user.pinfl} />
            <div className="text-gray-500">
              <p className="text-sm font-medium">Created At</p>
              <p>
                {new Date(user.createdAt).toLocaleString('uz-UZ', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </Section>

          <Section title="Document Information">
            <DetailItem label="Document Type" value={user.documentTypeId} />
            <DetailItem label="Document Number" value={user.documentNumber} />
          </Section>

          {student && (
            <Section title="Student Information">
              <DetailItem label="University" value={student.universityName} />
              <DetailItem label="Full Name" value={student.fullName} />
              <DetailItem
                label="Status"
                value={student.isStudent ? 'Active Student' : 'Inactive'}
              />
            </Section>
          )}

          {user.userPhoto && (
            <Section title="Identity Verification">
              <DetailItem label="Photo Verified" value={user.userPhoto ? 'Yes' : 'No'} />
              <div className="text-gray-500">
                <p className="text-sm font-medium">Created At</p>
                <p>
                  {new Date(user.createdAt).toLocaleString('uz-UZ', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {user.userPhoto.s3Photo && (
                <DetailItem
                  label="Reference ID"
                  value={`${user.userPhoto.s3Photo.key.keyAsStr.substring(0, 15)}...`}
                  title={user.userPhoto.s3Photo.key.keyAsStr}
                />
              )}
            </Section>
          )}
        </div>

        <div>
          {latin && (
            <Section title="Identity Provider Data">
              <DetailItem label="Gender" value={latin.genderName} />
              <DetailItem label="Nationality" value={latin.nationalityName} />
              <DetailItem label="Citizenship" value={latin.citizenshipName} />
              <DetailItem label="Birthplace" value={latin.birthPlace} />
              <DetailItem label="Birth Country" value={latin.birthCountryName} />
              <DetailItem label="Document Type" value={latin.documentType} />
              <DetailItem label="Document Number" value={latin.docNumber} />
              <div className="text-gray-500">
                <p className="text-sm font-medium">Created At</p>
                <p>
                  {new Date(user.createdAt).toLocaleString('uz-UZ', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </Section>
          )}

          {marriage && (
            <Section title="Marriage Information">
              <DetailItem
                label="Certificate Details"
                value={`${marriage.certSeries} ${marriage.certNumber} (${marriage.certDate})`}
              />
              <DetailItem
                label="Husband Name"
                value={`${marriage.husbandFirstName} ${marriage.husbandPatronym}`}
              />
              <DetailItem
                label="Wife Name"
                value={`${marriage.wifeFirstName} ${marriage.wifePatronym}`}
              />
            </Section>
          )}

          {disability && (
            <Section title="Disability Information">
              <DetailItem label="Disability Group" value={disability.disabilityGroup} />
              <DetailItem
                label="Period"
                value={`${disability.disabilityDateStart} - ${disability.disabilityDateEnd}`}
              />
              <DetailItem label="Percentage" value={`${disability.disabilityPercentage}%`} />
              <DetailItem label="Reference Number" value={disability.referenceNumber} />
            </Section>
          )}

          {agent && (
            <Section title="Agent Information">
              <DetailItem
                label="Full Name"
                value={`${agent.firstName} ${agent.middleName} ${agent.lastName}`}
              />
              <DetailItem label="Job Title" value={agent.jobTitle} />
              <DetailItem label="Contact" value={agent.personalEmailAddress} />
              <DetailItem label="Branch Code" value={agent.insonCenterBranchCode} />
              <DetailItem label="Responsible Person" value={agent.responsiblePerson} />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}
