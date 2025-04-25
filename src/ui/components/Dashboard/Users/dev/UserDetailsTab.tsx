import React from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations();
  const latin = user.identityProviderData?.personDataLatin;
  const marriage = user.identityProviderData?.marriageData;
  const disability = user.identityProviderData?.disabilityData;
  const agent = user.agentData;
  const student = user.studentOnboarding;

  return (
    <div className="bg-gray-50 p-6 rounded-lg h-[50rem] overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Section title={t('Dev.basicInfo')}>
            <DetailItem label={t('UserProfile.username')} value={user.username} />
            <DetailItem label={t('SignupRequests.email')} value={user.email} />
            <DetailItem label={t('UserProfile.phoneNumber')} value={user.phoneNumber} />
            <DetailItem label={t('UserProfile.birthDate')} value={user.dateOfBirth} />
            <DetailItem label={t('UserProfile.pinfl')} value={user.pinfl} />
            <DetailItem label={t('Filter.docTypeId')} value={user.documentTypeId} />
            <DetailItem label={t('Dev.documentNumber')} value={user.documentNumber} />
            <DetailItem label={t('Dev.socialNumber')} value={user.socialNumber} />

            {user.authApiUserId && (
              <DetailItem
                label={t('Dev.authApiUserId')}
                value={`${user.authApiUserId}...`}
                title={user.authApiUserId}
              />
            )}

            <DetailItem
              label={t('Dev.keycloakUserId')}
              value={`${user.keycloakUserId.substring(0, 15)}...`}
              title={user.keycloakUserId}
            />

            <div className="text-gray-500">
              <p className="text-sm font-medium">{t('Dev.createdAtLabel')}</p>
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
            <Section title={t('Dev.studentInfo')}>
              <DetailItem label={t('Student.university')} value={student.universityName} />
              <DetailItem
                label={t('Student.fullName')}
                value={`${user.firstName} ${user.lastName}`}
              />
              <DetailItem
                label={t('Student.status')}
                value={student.hasBeenEnrolledAsStudent ? t('Dev.activeStudent') : ''}
              />
            </Section>
          )}

          {user.userPhoto && (
            <Section title={t('Dev.identityVerification')}>
              <DetailItem
                label={t('Dev.photoVerified')}
                value={user.userPhoto ? t('Dev.yes') : t('Dev.no')}
              />
              <DetailItem
                label={t('Dev.photoCreatedAt')}
                value={new Date(user.userPhoto.createdAt).toLocaleString('uz-UZ', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
              <DetailItem
                label={t('Dev.photoUpdatedAt')}
                value={new Date(user.userPhoto.updatedAt).toLocaleString('uz-UZ', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
              <DetailItem label={t('Dev.photoSocialNumber')} value={user.userPhoto.socialNumber} />

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
            <Section title={t('Dev.userCardFront')}>
              <DetailItem
                label={t('Dev.imageUri')}
                value={`${user.userCardFront.imageUri.substring(0, 15)}...`}
                title={user.userCardFront.imageUri}
              />
              <DetailItem
                label={t('Dev.createdAtLabel')}
                value={new Date(user.userCardFront.createdAt).toLocaleString('uz-UZ', {
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
            <Section title={t('Dev.signedData')}>
              <DetailItem
                label={t('Dev.id')}
                value={`${user.userSignedData.id.substring(0, 15)}...`}
                title={user.userSignedData.id}
              />
              <DetailItem
                label={t('Dev.userId')}
                value={`${user.userSignedData.userId.substring(0, 15)}...`}
                title={user.userSignedData.userId}
              />
              <DetailItem label={t('Dev.socialNumber')} value={user.userSignedData.socialNumber} />
              <DetailItem label={t('Dev.version')} value={user.userSignedData.version} />
              <DetailItem label={t('Dev.scheme')} value={user.userSignedData.scheme} />
            </Section>
          )}
        </div>

        <div>
          {latin && (
            <Section title={t('Latin.identityProviderDataLatin')}>
              <DetailItem label={t('Latin.firstName')} value={latin.firstName} />
              <DetailItem label={t('Latin.middleName')} value={latin.middleName} />
              <DetailItem label={t('Latin.lastName')} value={latin.lastName} />
              <DetailItem label={t('ProfilePage.gender')} value={latin.genderName} />
              <DetailItem label={t('Latin.genderId')} value={latin.genderId} />
              <DetailItem label={t('ProfilePage.nationality')} value={latin.nationalityName} />
              <DetailItem label={t('SignupRequests.citizenship')} value={latin.citizenshipName} />
              <DetailItem label={t('Latin.birthplace')} value={latin.birthPlace} />
              <DetailItem label={t('SignupRequests.birthCountry')} value={latin.birthCountryName} />
              <DetailItem label={t('SignupRequests.docType')} value={latin.documentType} />
              <DetailItem label={t('SignupRequests.docNumber')} value={latin.docNumber} />
              <DetailItem label={t('Latin.docSeria')} value={latin.docSeria} />
              <DetailItem label={t('Latin.docIssueOn')} value={latin.docIssueOn} />
              <DetailItem label={t('Latin.docExpireOn')} value={latin.docExpireOn} />
              <DetailItem
                label={t('Latin.docIssueOrganization')}
                value={latin.docIssueOrganization}
              />
              <DetailItem label={t('UserProfile.phoneNumber')} value={latin.phoneNumber} />
              <DetailItem label={t('UserManagement.email')} value={latin.emailAddress} />
              <DetailItem
                label={t('Latin.isDeceased')}
                value={latin.isDeath ? t('Dev.yes') : t('Dev.no')}
              />
              <DetailItem label={t('Latin.deathDate')} value={latin.deathOn} />
              <DetailItem label={t('UserProfile.pinfl')} value={latin.pinfl} />
              <DetailItem label={t('UserProfile.birthDate')} value={latin.birthOn} />

              {latin.address && (
                <>
                  <DetailItem label={t('Latin.region')} value={latin.address.region} />
                  <DetailItem label={t('Agent.district')} value={latin.address.district} />
                  <DetailItem label={t('UserProfile.address')} value={latin.address.address} />
                  <DetailItem
                    label={t('Latin.temporaryAddress')}
                    value={latin.address.temporaryAddress}
                  />
                  <DetailItem
                    label={t('Latin.temporaryFrom')}
                    value={latin.address.temporaryDateFrom}
                  />
                  <DetailItem
                    label={t('Latin.temporaryUntil')}
                    value={latin.address.temporaryDateTill}
                  />
                </>
              )}
            </Section>
          )}

          {marriage && (
            <Section title={t('Marriage.marriageInfo')}>
              <DetailItem
                label={t('Marriage.certificate')}
                value={`${marriage.certSeries} ${marriage.certNumber} (${marriage.certDate})`}
              />
              <DetailItem
                label={t('Marriage.husbandName')}
                value={`${marriage.husbandFirstName} ${marriage.husbandPatronym}`}
              />
              <DetailItem
                label={t('Marriage.wifeName')}
                value={`${marriage.wifeFirstName} ${marriage.wifePatronym}`}
              />
              <DetailItem label={t('Marriage.branch')} value={marriage.branch} />
              <DetailItem label={t('SignupRequests.docNumber')} value={marriage.docNumber} />
              <DetailItem label={t('Marriage.docOn')} value={marriage.docOn} />
              <DetailItem label={t('Marriage.husbandCitizen')} value={marriage.husbandCitizen} />
              <DetailItem label={t('Marriage.wifeCitizen')} value={marriage.wifeCitizen} />
            </Section>
          )}

          {disability && (
            <Section title={t('Disability.disabilityInfo')}>
              <DetailItem label={t('Disability.group')} value={disability.disabilityGroup} />
              <DetailItem
                label={t('Disability.period')}
                value={`${disability.disabilityDateStart} - ${disability.disabilityDateEnd}`}
              />
              <DetailItem
                label={t('Disability.percentage')}
                value={`${disability.disabilityPercentage}%`}
              />
              <DetailItem
                label={t('Disability.referenceNumber')}
                value={disability.referenceNumber}
              />
              <DetailItem label="ICD10" value={disability.icd10} />
              <DetailItem
                label={t('Disability.parasportRecom')}
                value={disability.parasportRecom}
              />
              <DetailItem
                label={t('Disability.professionRecom')}
                value={disability.professionRecom}
              />
            </Section>
          )}

          {agent && (
            <Section title={t('Agent.agentInfo')}>
              <DetailItem
                label={t('Agent.fullName')}
                value={`${agent.firstName} ${agent.middleName} ${agent.lastName}`}
              />
              <DetailItem label={t('Agent.dateOfBirth')} value={agent.dateOfBirth} />
              <DetailItem label={t('UserProfile.jobTitle')} value={agent.jobTitle} />
              <DetailItem label={t('Agent.branchCode')} value={agent.insonCenterBranchCode} />
              <DetailItem label={t('Agent.district')} value={agent.insonCenterDistrict} />
              <DetailItem
                label={t('UserProfile.personalEmail')}
                value={agent.personalEmailAddress}
              />
              <DetailItem label={t('Agent.agreementEmail')} value={agent.agreementEmailAddress} />
              <DetailItem label={t('UserProfile.address')} value={agent.address} />
              <DetailItem label={t('UserManagement.agentData.location')} value={agent.location} />
              <DetailItem label={t('Agent.responsiblePerson')} value={agent.responsiblePerson} />
              <DetailItem label={t('Agent.bankLogin')} value={agent.bankingSystemLogin} />
              <DetailItem label={t('Marriage.branch')} value={agent.branch} />
              <DetailItem label={t('UserProfile.pinfl')} value={agent.pinfl?.id} />
              <DetailItem
                label={t('Agent.primaryPhone')}
                value={`${agent.personalPhone.phoneCode} ${agent.personalPhone.phoneNumber}`}
              />
              {agent.mobilePhoneNumbers?.map((p, idx) => (
                <DetailItem
                  key={idx}
                  label={`${t('Agent.mobilePhone')} ${idx + 1}`}
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
