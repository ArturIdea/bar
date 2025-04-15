export const getBenefitName = (benefitType: any, locale: string) => {
  const names = benefitType?.name || {};
  return names[locale] || names.uzLatn || 'N/A';
};
