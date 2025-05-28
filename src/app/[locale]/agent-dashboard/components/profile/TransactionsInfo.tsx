/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { ApiClient } from '@/core/ApiClient';

interface CardDetails {
  cardNo: string;
  cardstatus: string;
  validity: string;
  currentBalance: string;
}

interface Transaction {
  authCode: string;
  amount: number;
  type: string;
  status: string;
  localDate: string;
  bankingDate: string;
  transactionAmount: number;
  transactionCurrency: string;
  feeAmount: number;
  merchantName: string;
  description: string;
}

interface TransactionResponse {
  cards: Array<{
    id: number;
    sdkCardId: string;
  }>;
  trxHistory: {
    [key: string]: {
      pageNumber: number;
      pageSize: number;
      totalPages: number;
      records: Transaction[];
    };
  };
}

interface TransactionsInfoProps {
  pinfl: string;
}

const TRANSACTION_TYPES = ['ALL', 'CAPTURE', 'AUTHORIZATION'];
const TRANSACTION_STATUSES = ['ALL', 'COMPLETED', 'REJECTED', 'PENDING', 'DECLINED'];

interface Filters {
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  minAmount?: number;
  maxAmount?: number;
  merchantQuery: string;
}

export const TransactionsInfo = ({ pinfl }: TransactionsInfoProps) => {
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    type: 'ALL',
    status: 'ALL',
    minAmount: undefined,
    maxAmount: undefined,
    merchantQuery: '',
  });

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await ApiClient.shared.get<CardDetails>(
          `/api/agent/user/card-details?pinflStr=${pinfl}`
        );
        setCardDetails(response.data);
      } catch (err) {
        if (err instanceof Error && 'response' in err && (err as any).response?.status === 404) {
          setError('Data not found');
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (pinfl) {
      fetchCardDetails();
    }
  }, [pinfl]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await ApiClient.shared.post<TransactionResponse>(
          `/api/agent/user/card/transactions?pinfl=${pinfl}`,
          {
            pageNumber: currentPage,
            pageSize: 20,
            filter: {
              dateFrom: new Date(filters.startDate).toISOString(),
              dateTo: new Date(filters.endDate).toISOString(),
            },
          }
        );
        const firstCardId = response.data.cards[0]?.id.toString();
        if (firstCardId && response.data.trxHistory[firstCardId]) {
          const cardTransactions = response.data.trxHistory[firstCardId];
          setTransactions(cardTransactions.records);
          setTotalPages(cardTransactions.totalPages);
        }
      } catch (err) {
        if (err instanceof Error && 'response' in err && (err as any).response?.status === 404) {
          setTransactions([]);
          setError('Data not found');
        } else {
          console.error('Error fetching transactions:', err);
          setError('An error occurred while fetching transactions');
        }
      }
    };

    if (pinfl) {
      fetchTransactions();
    }
  }, [pinfl, currentPage, filters.startDate, filters.endDate]);

  const handleFilterChange = (name: keyof Filters, value: string | number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(0);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    // Type filter
    if (filters.type !== 'ALL' && transaction.type !== filters.type) {
      return false;
    }

    // Status filter
    if (filters.status !== 'ALL' && transaction.status !== filters.status) {
      return false;
    }

    // Amount range filter
    if (filters.minAmount !== undefined && transaction.amount < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount !== undefined && transaction.amount > filters.maxAmount) {
      return false;
    }

    // Merchant filter
    if (
      filters.merchantQuery &&
      !transaction.merchantName?.toLowerCase().includes(filters.merchantQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  if (loading) {
    return <div className="bg-white p-4">Loading...</div>;
  }

  if (error) {
    return <div className="bg-white p-4 text-gray-500">{error}</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div className="bg-white p-4 text-gray-500">Data not found</div>;
  }

  return (
    <div className="bg-white p-4">
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex justify-between p-1">
          <div>Card No:</div>
          <div>{cardDetails?.cardNo}</div>
        </div>
        <div className="flex justify-between p-1">
          <div>Card Status:</div>
          <div>{cardDetails?.cardstatus || 'N/A'}</div>
        </div>
        <div className="flex justify-between p-1">
          <div>Valid Till:</div>
          <div>
            <span>{cardDetails?.validity || 'XX/XX'}</span>
          </div>
        </div>
        <div className="flex justify-between p-1">
          <div>Current Balance:</div>
          <div>{cardDetails?.currentBalance || '0'} UZS</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>

        {/* Enhanced Filters Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
          <h4 className="text-base font-semibold text-gray-900 mb-4">Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Range */}
            <div className="flex flex-col">
              <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                max={filters.endDate}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={filters.startDate}
              />
            </div>

            {/* Transaction Type */}
            <div className="flex flex-col">
              <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">
                Transaction Type
              </label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TRANSACTION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TRANSACTION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Range */}
            {/* <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Amount Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minAmount || ''}
                  onChange={(e) => handleFilterChange('minAmount', e.target.value ? Number(e.target.value) : undefined)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxAmount || ''}
                  onChange={(e) => handleFilterChange('maxAmount', e.target.value ? Number(e.target.value) : undefined)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
              </div>
            </div> */}

            {/* Merchant Search */}
            {/* <div className="flex flex-col">
              <label htmlFor="merchant" className="text-sm font-medium text-gray-700 mb-1">
                Merchant Search
              </label>
              <input
                type="text"
                id="merchant"
                placeholder="Search merchant..."
                value={filters.merchantQuery}
                onChange={(e) => handleFilterChange('merchantQuery', e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-center">
            <thead>
              <tr className="border-b border-black">
                <th className="px-4 py-2 border-r border-black">Date</th>
                <th className="px-4 py-2 border-r border-black">Amount</th>
                <th className="px-4 py-2 border-r border-black">Type</th>
                <th className="px-4 py-2 border-r border-black">Status</th>
                <th className="px-4 py-2 border-r border-black">Fee Amount</th>
                <th className="px-4 py-2 border-r border-black">Merchant</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-2 border-r border-black">
                      {new Date(transaction.localDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-r border-black">
                      {transaction.amount} {transaction.transactionCurrency}
                    </td>
                    <td className="px-4 py-2 border-r border-black">{transaction.type}</td>
                    <td className="px-4 py-2 border-r border-black">{transaction.status}</td>
                    <td className="px-4 py-2 border-r border-black">{transaction.feeAmount}</td>
                    <td className="px-4 py-2 border-r border-black">
                      {transaction.merchantName || '-'}
                    </td>
                    <td className="px-4 py-2">{transaction.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    No transactions found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 border rounded disabled:opacity-50 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 border rounded disabled:opacity-50 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
