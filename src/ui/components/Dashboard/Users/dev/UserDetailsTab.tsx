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
    <div className="bg-gray-50 p-6 rounded-lg h-[50rem] overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Section title="Basic Information">
            <DetailItem label="Username" value={user.username} />
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Phone Number" value={user.phoneNumber} />
            <DetailItem label="Date of Birth" value={user.dateOfBirth} />
            <DetailItem label="PINFL" value={user.pinfl} />
            <DetailItem label="Document Type ID" value={user.documentTypeId} />
            <DetailItem label="Document Number" value={user.documentNumber} />
            <DetailItem label="Social Number" value={user.socialNumber} />
            <DetailItem
              label="Auth API User ID"
              value={`${user.authApiUserId.substring(0, 15)}...`}
              title={user.authApiUserId}
            />
            <DetailItem
              label="Keycloak User ID"
              value={`${user.keycloakUserId.substring(0, 15)}...`}
              title={user.keycloakUserId}
            />
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
              <DetailItem
                label="Photo Created At"
                value={new Date(user.userPhoto.createdAt).toLocaleString('uz-UZ', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
              <DetailItem
                label="Photo Updated At"
                value={new Date(user.userPhoto.updatedAt).toLocaleString('uz-UZ', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
              <DetailItem label="Photo Social Number" value={user.userPhoto.socialNumber} />
              {user.userPhoto.s3Photo && (
                <>
                  <DetailItem
                    label="S3 Key"
                    value={`${user.userPhoto.s3Photo.key.keyAsStr.substring(0, 15)}...`}
                    title={user.userPhoto.s3Photo.key.keyAsStr}
                  />
                  <DetailItem
                    label="S3 ETag"
                    value={`${user.userPhoto.s3Photo.etag.value.substring(0, 15)}...`}
                    title={user.userPhoto.s3Photo.etag.value}
                  />
                </>
              )}
            </Section>
          )}

          {user.userCardFront && (
            <Section title="User Card Front">
              <DetailItem
                label="Image URI"
                value={`${user.userCardFront.imageUri.substring(0, 15)}...`}
                title={user.userCardFront.imageUri}
              />
              <DetailItem
                label="Created At"
                value={new Date(user.userCardFront?.createdAt).toLocaleString('uz-UZ', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
              <DetailItem
                label="S3 Key"
                value={`${user.userCardFront.s3Ref.key.keyAsStr.substring(0, 15)}...`}
                title={user.userCardFront.s3Ref.key.keyAsStr}
              />
            </Section>
          )}

          {user.userSignedData && (
            <Section title="Signed Data">
              <DetailItem
                label="ID"
                value={`${user.userSignedData.id.substring(0, 15)}...`}
                title={user.userSignedData.id}
              />
              <DetailItem
                label="User ID"
                value={`${user.userSignedData.userId.substring(0, 15)}...`}
                title={user.userSignedData.userId}
              />
              <DetailItem label="Social Number" value={user.userSignedData.socialNumber} />
              <DetailItem label="Version" value={user.userSignedData.version} />
              <DetailItem label="Scheme" value={user.userSignedData.scheme} />
            </Section>
          )}
        </div>

        <div>
          {latin && (
            <Section title="Identity Provider Data (Latin)">
              <DetailItem label="First Name" value={latin.firstName} />
              <DetailItem label="Middle Name" value={latin.middleName} />
              <DetailItem label="Last Name" value={latin.lastName} />
              <DetailItem label="Gender" value={latin.genderName} />
              <DetailItem label="Gender ID" value={latin.genderId} />
              <DetailItem label="Nationality" value={latin.nationalityName} />
              <DetailItem label="Citizenship" value={latin.citizenshipName} />
              <DetailItem label="Birthplace" value={latin.birthPlace} />
              <DetailItem label="Birth Country" value={latin.birthCountryName} />
              <DetailItem label="Document Type" value={latin.documentType} />
              <DetailItem label="Document Number" value={latin.docNumber} />
              <DetailItem label="Doc Seria" value={latin.docSeria} />
              <DetailItem label="Doc Issue On" value={latin.docIssueOn} />
              <DetailItem label="Doc Expire On" value={latin.docExpireOn} />
              <DetailItem label="Doc Issue Org." value={latin.docIssueOrganization} />
              <DetailItem label="Phone Number" value={latin.phoneNumber} />
              <DetailItem label="Email Address" value={latin.emailAddress} />
              <DetailItem label="Is Deceased" value={latin.isDeath ? 'Yes' : 'No'} />
              <DetailItem label="Death Date" value={latin.deathOn} />
              <DetailItem label="PINFL" value={latin.pinfl} />
              <DetailItem label="Birth Date" value={latin.birthOn} />
              {latin.address && (
                <>
                  <DetailItem label="Region" value={latin.address.region} />
                  <DetailItem label="District" value={latin.address.district} />
                  <DetailItem label="Address" value={latin.address.address} />
                  <DetailItem label="Temporary Address" value={latin.address.temporaryAddress} />
                  <DetailItem label="Temporary From" value={latin.address.temporaryDateFrom} />
                  <DetailItem label="Temporary Until" value={latin.address.temporaryDateTill} />
                </>
              )}
            </Section>
          )}

          {marriage && (
            <Section title="Marriage Information">
              <DetailItem
                label="Certificate"
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
              <DetailItem label="Branch" value={marriage.branch} />
              <DetailItem label="Doc Number" value={marriage.docNumber} />
              <DetailItem label="Doc On" value={marriage.docOn} />
              <DetailItem label="Husband Citizen" value={marriage.husbandCitizen} />
              <DetailItem label="Wife Citizen" value={marriage.wifeCitizen} />
            </Section>
          )}

          {disability && (
            <Section title="Disability Information">
              <DetailItem label="Group" value={disability.disabilityGroup} />
              <DetailItem
                label="Period"
                value={`${disability.disabilityDateStart} - ${disability.disabilityDateEnd}`}
              />
              <DetailItem label="Percentage" value={`${disability.disabilityPercentage}%`} />
              <DetailItem label="Reference Number" value={disability.referenceNumber} />
              <DetailItem label="ICD10" value={disability.icd10} />
              <DetailItem label="Parasport Recommendation" value={disability.parasportRecom} />
              <DetailItem label="Profession Recommendation" value={disability.professionRecom} />
            </Section>
          )}

          {agent && (
            <Section title="Agent Information">
              <DetailItem
                label="Full Name"
                value={`${agent.firstName} ${agent.middleName} ${agent.lastName}`}
              />
              <DetailItem label="Date of Birth" value={agent.dateOfBirth} />
              <DetailItem label="Job Title" value={agent.jobTitle} />
              <DetailItem label="Branch Code" value={agent.insonCenterBranchCode} />
              <DetailItem label="District" value={agent.insonCenterDistrict} />
              <DetailItem label="Email" value={agent.personalEmailAddress} />
              <DetailItem label="Agreement Email" value={agent.agreementEmailAddress} />
              <DetailItem label="Address" value={agent.address} />
              <DetailItem label="Location" value={agent.location} />
              <DetailItem label="Responsible Person" value={agent.responsiblePerson} />
              <DetailItem label="Bank Login" value={agent.bankingSystemLogin} />
              <DetailItem label="Branch" value={agent.branch} />
              <DetailItem label="PINFL ID" value={agent.pinfl?.id} />
              <DetailItem
                label="Primary Phone"
                value={`${agent.personalPhone.phoneCode} ${agent.personalPhone.phoneNumber}`}
              />
              {agent.mobilePhoneNumbers?.map((p, idx) => (
                <DetailItem
                  key={idx}
                  label={`Mobile Phone ${idx + 1}`}
                  value={`${p.phoneCode} ${p.phoneNumber}`}
                />
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}
