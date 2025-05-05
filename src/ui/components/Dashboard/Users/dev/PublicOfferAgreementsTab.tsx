import { useLocale, useTranslations } from 'next-intl';
import { clean } from '@/core/utils/sanitize';
import { UserPublicOfferAgreement } from '@/domain/users/dev/entities/UserPublicOfferAgreement';

const localeMap: Record<string, string> = {
  'uz-latn': 'uzltn',
  'uz-cyrl': 'uz',
};

const getLocalizedValue = (
  obj: Record<string, string> = {},
  locale: string,
  fallbackOrder: string[] = ['uz-latn', 'en', 'ru', 'kaa', 'uz-cyrl']
): string => {
  const apiLocale = localeMap[locale] || locale;

  return (
    obj[apiLocale] || fallbackOrder.map((loc) => obj[localeMap[loc] || loc]).find(Boolean) || 'N/A'
  );
};

const getAgreementDataByLocale = (agreement: UserPublicOfferAgreement, locale: string) => {
  return {
    htmlContent: getLocalizedValue(agreement.htmlContent, locale),
    s3Ref: getLocalizedValue(agreement?.s3Refs, locale),
  };
};

export const PublicOfferAgreementsTab = ({
  agreement,
}: {
  agreement: UserPublicOfferAgreement;
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const { htmlContent, s3Ref } = getAgreementDataByLocale(agreement, locale);
  const safeHtml = clean(htmlContent);

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-primary">{t('Dev.publicOfferAgreement')}</h2>
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              agreement.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {agreement.active
              ? t('UserManagement.details.active')
              : t('UserManagement.details.inactive')}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div className="bg-gray-50 p-3 rounded text-gray-500">
            <p className="text-sm  mb-1">{t('Dev.version')}</p>
            <p className="font-medium">{agreement.version || 'Ν/Α'}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded text-gray-500">
            <p className="text-sm mb-1">{t('Dev.s3Reference')}</p>
            <p className="font-medium font-mono text-md overflow-hidden text-ellipsis">{s3Ref}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded text-gray-500">
            <p className="text-sm  mb-1">{t('Dev.createdAtLabel')}</p>
            <p className="font-medium ">
              {new Date(agreement.createdAt).toLocaleString('uz-UZ', {
                timeZone: 'Asia/Tashkent',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded text-gray-500">
            <p className="text-sm mb-1">{t('Dev.updatedAt')}</p>
            <p className="font-medium">
              {new Date(agreement.createdAt).toLocaleString('uz-UZ', {
                timeZone: 'Asia/Tashkent',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>

      {agreement.active && (
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 text-primary font-medium text-center py-3 border-b border-blue-100">
            {t('Dev.publicOfferAgreement')} - {locale.toUpperCase()}
          </div>
          <div className="p-6 h-[35rem] overflow-y-auto prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
          </div>
        </div>
      )}
    </div>
  );
};
