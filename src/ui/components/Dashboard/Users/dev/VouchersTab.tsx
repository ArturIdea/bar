import { UserVoucher } from '@/domain/users/dev/entities/UserVoucher';
import { Pagination } from '../../Pagination';

export const VouchersTab = ({
  vouchers,
  page,
  pageSize,
  vouchersTotal,
  handlePageChange,
  handlePageSizeChange,
}: {
  vouchers: UserVoucher[];
  page: number;
  pageSize: number;
  vouchersTotal: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-primary">User Vouchers</h2>

      {vouchers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center border border-gray-100">
          <p className="text-gray-500">No vouchers found for this user</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {vouchers.map((voucher, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary">
                        {new Intl.NumberFormat('uz-UZ', {
                          style: 'currency',
                          currency: 'UZS',
                          minimumFractionDigits: 2,
                        }).format(voucher.amount)}
                      </h3>
                      <p className="text-sm text-gray-500">ID: {voucher.id}</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 px-3 py-1 rounded font-medium text-blue-800">
                    {voucher.marketPlace}
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded text-gray-500">
                    <p className="text-sm mb-1">Promo Code</p>
                    <p className="font-medium font-mono">{voucher.promoCode}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-gray-500">
                    <p className="text-sm mb-1">Marketplace ID</p>
                    <p className="font-medium">{voucher.marketPlaceId}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-gray-500">
                    <p className="text-sm mb-1">MXIK Code</p>
                    <p className="font-medium">{voucher.mxikCode}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded md:col-span-2 text-gray-500">
                    <p className="text-sm mb-1">Classification</p>
                    <p className="font-medium">
                      {voucher.classificatorName}
                      <span className="text-sm text-gray-500 ml-2">
                        ({voucher.classificatorCode})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="mb-2 sm:mb-0 text-gray-500">
                    <p className="text-sm">Given At</p>
                    <p className="text-sm font-medium">
                      {new Date(voucher.givenAt).toLocaleString('uz-UZ', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-gray-500">
                    <p className="text-sm">Used At</p>
                    <p className="text-sm font-medium">
                      {voucher.usedAt
                        ? new Date(voucher.usedAt).toLocaleString('uz-UZ', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '—'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={vouchersTotal}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
