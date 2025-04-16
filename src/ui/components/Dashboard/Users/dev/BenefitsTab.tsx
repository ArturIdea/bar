import { UserBenefit } from '@/domain/users/dev/entities/UserBenefit';
import { Pagination } from '../../Pagination';

export const BenefitsTab = ({
  benefits,
  page,
  pageSize,
  benefitsTotal,
  handlePageChange,
  handlePageSizeChange,
}: {
  benefits: UserBenefit[];
  page: number;
  pageSize: number;
  benefitsTotal: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-primary">User Benefits</h2>

      {benefits.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center border border-gray-100">
          <p className="text-gray-500">No benefits found for this user</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-5 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-primary">
                      {new Intl.NumberFormat('uz-UZ', {
                        style: 'currency',
                        currency: 'UZS',
                        minimumFractionDigits: 2,
                      }).format(benefit.amount)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">ID: {benefit.id}</p>
                    <p className="text-sm text-gray-500">Status: {benefit.status}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">
                    {benefit.benefitType?.name?.uz ??
                      Object.values(benefit.benefitType?.name ?? {})[0] ??
                      '—'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="mb-1">PINFL</p>
                    <p className="font-medium">{benefit.pinfl}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="mb-1">Appointed PINFL</p>
                    <p className="font-medium">{benefit.appointedPinfl}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="mb-1">Deduction Name</p>
                    <p className="font-medium">{benefit.deductionName || '—'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="mb-1">Deduction Amount</p>
                    <p className="font-medium">{benefit.deductionAmount?.toFixed(2) ?? '—'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="mb-1">Deduction %</p>
                    <p className="font-medium">{benefit.deductionPercentage?.toFixed(2) ?? '—'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded md:col-span-2">
                    <p className="mb-1">Benefit Period</p>
                    <p className="font-medium">
                      {benefit.startedOn
                        ? new Date(benefit.startedOn).toLocaleDateString('uz-UZ')
                        : '—'}{' '}
                      →{' '}
                      {benefit.endedOn
                        ? new Date(benefit.endedOn).toLocaleDateString('uz-UZ')
                        : '—'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                  <p className="mb-1">Cancelled On</p>
                  <p className="font-medium">
                    {benefit.cancelledOn
                      ? new Date(benefit.cancelledOn).toLocaleString('uz-UZ')
                      : '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={benefitsTotal}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
