import Image from 'next/image';
import { useTranslations } from 'next-intl';
import hugIcon from '@/../public/images/icons/dashboard/hugIcon.svg';
import { UserBenefitBankAccount } from '@/domain/users/dev/entities/UserBenefitBankAccount';

export const BenefitBankAccountTab = ({
  userBenefitBankAcc,
}: {
  userBenefitBankAcc: UserBenefitBankAccount[];
}) => {
  const t = useTranslations();
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-primary">{t('Dev.benefitBankAcc')}</h2>

      {userBenefitBankAcc.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center border border-gray-100">
          <p className="text-gray-500">No benefit bank accounts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {userBenefitBankAcc.map((account, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-primary/5 rounded-lg mr-4">
                  <Image src={hugIcon} alt="Hug Icon" width={48} height={48} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary">
                    {t('UserManagement.benefits.benefitType')}: {account.benefitTypeId}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t('UserManagement.benefits.addedOn')}{' '}
                    {new Date(account.createdAt).toLocaleString('uz-UZ', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded text-gray-500">
                  <p className="text-sm  mb-1">{t('Dev.bankCode')}</p>
                  <p className="font-medium">{account.bankCode}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-gray-500">
                  <p className="text-sm  mb-1">{t('Agent.branchCode')}</p>
                  <p className="font-medium">{account.branchCode.value}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded col-span-1 md:col-span-2 text-gray-500">
                  <p className="text-sm mb-1">{t('Dev.masterBankCode')}</p>
                  <p className="font-medium font-mono">{account.masterBankAccountNumber}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded col-span-1 md:col-span-2 text-gray-500">
                  <p className="text-sm mb-1">{t('Dev.subBank')}</p>
                  <p className="font-medium font-mono">{account.subBankAccountNumber || '-'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
