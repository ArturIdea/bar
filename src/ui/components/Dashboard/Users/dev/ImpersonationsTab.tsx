import { useTranslations } from 'next-intl';
import { UserImpersonationOtp } from '@/domain/users/dev/entities/UserImpersonationOtp';
import { Pagination } from '../../Pagination';

export const ImpersonationsTab = ({
  userImpersonationOtp,
  page,
  pageSize,
  impersonationsTotal,
  handlePageChange,
  handlePageSizeChange,
}: {
  userImpersonationOtp: UserImpersonationOtp[];
  page: number;
  pageSize: number;
  impersonationsTotal: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const t = useTranslations();
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-primary">{t('Dev.impersonations')}</h2>

      {userImpersonationOtp.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center border border-gray-100">
          <p className="text-gray-500">No impersonation records found</p>
        </div>
      ) : (
        <>
          <div className="shadow border ring-opacity-5 rounded-lg mb-6 max-h-[40rem] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="py-3 px-4 text-left text-sm font-semibold">
                    OTP
                  </th>
                  <th scope="col" className="py-3 px-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-4 text-left text-sm font-semibold">
                    Expiration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {userImpersonationOtp.map((imp, index) => {
                  const now = new Date();
                  const expiryDate = new Date(imp.expiresAt);
                  const isExpired = expiryDate < now;

                  return (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900">
                        <div className="bg-gray-100 px-2 py-1 rounded-md font-mono">{imp.otp}</div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {isExpired ? 'Expired' : 'Active'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        {new Date(imp.expiresAt).toLocaleString('uz-UZ', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={impersonationsTotal}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
