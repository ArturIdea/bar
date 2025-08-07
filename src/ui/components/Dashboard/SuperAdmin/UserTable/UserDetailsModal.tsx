/* eslint-disable no-console */
import React, { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Loader2, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'universal-cookie';
import placeholderUserImage from '@/../public/images/icons/dashboard/placeholderUserImage.jpg';
import { assignDotColors } from '@/core/utils/dotColors';
import { truncate } from '@/core/utils/truncate';
import { useRouter } from '@/i18n/routing';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';
import { useUserCard } from '@/ui/hooks/ui/useUserCard';
import { useUserDetail } from '@/ui/hooks/ui/useUserDetail';
import { ApiClient } from '@/core/ApiClient';

interface MultiTabUserDetailsModalProps {
  userId?: string;
  pinfl?: string;
  onClose: () => void;
  onOpenSignupRequest: (signupRequestId: string) => void;
}

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

const UserDetailsModal: React.FC<MultiTabUserDetailsModalProps> = ({
  userId,
  pinfl,
  onClose,
  onOpenSignupRequest,
}) => {
  const { user, loading, error } = useUserDetail(userId, pinfl);
  const { userCard } = useUserCard(userId);
  const t = useTranslations();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  const cookies = new Cookies();
  const locale = cookies.get('NEXT_LOCALE') || 'en';
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('details');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // match transition duration
  }

  const handleHistoryClick = () => {
    if (user?.createdBy?.userId) {
      router.push(`/dashboard/history?userId=${user.createdBy.userId}`);
    }
  };

  const getBenefitName = (benefitType: any) => {
    const names = benefitType?.name || {};
    return names[locale] || names.uzLatn || 'N/A';
  };

  const UserInfoSection = ({ user, t }: { user: any; t: any }) => {
    const fields = [
      { label: 'email', value: user.email },
      { label: 'nationality', value: user.nationalityName },
      { label: 'citizenship', value: user.citizenshipName },
      { label: 'birthCountry', value: user.birthCountryName },
      { label: 'dob', value: user.dateOfBirth },
      { label: 'socialNumber', value: user.socialNumber },
      { label: 'pinfl', value: user.pinfl },
      {
        label: 'createdAt',
        value: user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A',
      },
    ];
    console.log('User Info Section:', user.pinfl);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-gray-400 font-light">{t(`UserManagement.${label}`)}</p>
            {value ?? 'N/A'}
          </div>
        ))}
      </div>
    );
  };

  const AgentDataSection = ({ agentData, t }: { agentData: any; t: any }) => {
    const fields = [
      { label: 'firstName', value: agentData.firstName },
      { label: 'lastName', value: agentData.lastName },
      { label: 'jobTitle', value: agentData.jobTitle },
      { label: 'dob', value: agentData.dateOfBirth },
      { label: 'pinfl', value: agentData.pinfl?.id },
      { label: 'address', value: agentData.address },
      { label: 'responsiblePerson', value: agentData.responsiblePerson },
      { label: 'insonCenterDistrict', value: agentData.insonCenterDistrict },
      { label: 'insonCenterBranchCode', value: agentData.insonCenterBranchCode },
      {
        label: 'personalPhone',
        value:
          agentData.personalPhone &&
          `${agentData.personalPhone.phoneCode}-${agentData.personalPhone.phoneNumber}`,
      },
      { label: 'personalEmail', value: agentData.personalEmailAddress },
      { label: 'agreementEmail', value: agentData.agreementEmailAddress },
      { label: 'location', value: agentData.location },
    ];
    return (
      <div className="mt-6">
        <h3 className="pb-2 text-lg font-semibold text-gray-400">
          {t('UserManagement.agentData.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-gray-400 font-normal">{t(`UserManagement.agentData.${label}`)}</p>
              {value ?? 'N/A'}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const BenefitsSection = ({ benefits, getBenefitName, t }: any) => {
    const [filter, setFilter] = useState<'ACTIVE' | 'EXPIRED'>('ACTIVE');
    const STATUS: { key: 'ACTIVE' | 'EXPIRED'; label: string }[] = [
      { key: 'ACTIVE', label: t('UserManagement.details.active') },
      { key: 'EXPIRED', label: t('UserManagement.details.expired') }
    ];
    const filtered = benefits.filter((b: any) => b.status === filter);
    const colors = useMemo(() => assignDotColors(benefits), [benefits]);

    return (
      <div className="flex flex-col gap-6 h-[60vh]">
        <div className="flex bg-gray-100 rounded-full justify-evenly p-2 mb-4">
          {STATUS.map(({ key, label }) => (
            <button
              type="button"
              key={key}
              onClick={() => setFilter(key)}
              className={`px-9 py-2 rounded-full whitespace-nowrap w-full ${
                filter === key ? 'bg-primary text-white' : 'text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto h-full">
          {filtered.map((benefit: any, index: number) => {
            const fullTitle = getBenefitName(benefit.benefitType, locale);
            const shortTitle = truncate(fullTitle, 90);
            return (
              <div
                key={index}
                className="border rounded-xl p-4 flex justify-between items-center bg-white"
              >
                <div className="flex items-start gap-4">
                  <span className={`p-1 rounded-full ${colors[index]} mt-[6px]`} />
                  <div>
                    <h3
                      className="font-semibold text-base leading-snug max-h-[3rem] overflow-hidden line-clamp-2"
                      title={fullTitle}
                    >
                      {shortTitle}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">лв</p>
                      <div className="border-r-2 h-3" />
                      <span
                        className={`font-medium ${benefit.status === 'EXPIRED' ? 'text-red-500' : 'text-green-500'}`}
                      >
                        {benefit.amount?.priceValue ?? benefit.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-center text-gray-500 mt-10">{t('SignupRequests.Empty')}</p>}
        </div>
      </div>
    );
  };

  const CreatedBySection = ({ createdBy, handleHistoryClick, t }: any) => (
    <div className="flex justify-between items-center gap-6">
      <div className="flex items-center gap-4">
        <Image
          src={createdBy.photoUrl || placeholderUserImage}
          width={80}
          height={80}
          alt="Agent Image"
          className="w-20 h-20 rounded-full shadow-md object-cover"
        />
        <h3 className="text-xl font-semibold">
          {createdBy.firstName} {createdBy.lastName}
        </h3>
      </div>
      <button
        type="button"
        className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full flex items-center gap-1"
        onClick={handleHistoryClick}
      >
        {t('Buttons.history')} <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const TransactionsSection = ({ pinfl }: { pinfl: string | undefined }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
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
    console.log('Transactions Section:', pinfl);

    useEffect(() => {
      const fetchCardDetails = async () => {
        try {
          const response = await ApiClient.shared.get<CardDetails>(
            `/api/admin/user/card-details?pinflStr=${pinfl}`
          );
          setCardDetails(response.data);
        } catch (err) {
          if (err instanceof Error && 'response' in err && (err as any).response?.status === 404) {
            setError('Transactions not found');
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
            `/api/admin/user/card/transactions?pinfl=${pinfl}`,
            {
              pageNumber: currentPage,
              pageSize: 20,
              filter: {
                dateFrom: new Date(filters.startDate).toISOString(),
                dateTo: new Date(filters.endDate).toISOString(),
              },
            }
          );

          const data = response.data;
          const firstCardId = data.cards[0]?.id.toString();
          if (firstCardId && data.trxHistory[firstCardId]) {
            const cardTransactions = data.trxHistory[firstCardId];
            setTransactions(cardTransactions.records);
            setTotalPages(cardTransactions.totalPages);
          }
        } catch (err) {
          if (err instanceof Error && 'response' in err && (err as any).response?.status === 404) {
            setTransactions([]);
            setError('Transactions not found');
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
      if (filters.type !== 'ALL' && transaction.type !== filters.type) {
        return false;
      }
      if (filters.status !== 'ALL' && transaction.status !== filters.status) {
        return false;
      }
      if (filters.minAmount !== undefined && transaction.amount < filters.minAmount) {
        return false;
      }
      if (filters.maxAmount !== undefined && transaction.amount > filters.maxAmount) {
        return false;
      }
      if (
        filters.merchantQuery &&
        !transaction.merchantName?.toLowerCase().includes(filters.merchantQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    if (loading) {
      return <div className="bg-white p-4">{t('Agents.Loading')}</div>;
    }

    if (error) {
      return <div className="bg-white p-4 text-gray-500">{error}</div>;
    }

    if (!transactions || transactions.length === 0) {
      return <div className="bg-white p-4 text-gray-500">{t('SignupRequests.NoCardAvailable')}</div>;
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
            <div>{cardDetails?.validity || 'XX/XX'}</div>
          </div>
          <div className="flex justify-between p-1">
            <div>Current Balance:</div>
            <div>{cardDetails?.currentBalance || '0'} UZS</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4"> {t('Agents.TransactionHistory')}</h3>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4">{t('Filter.Filters')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  id="startDate"
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
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={filters.startDate}
                />
              </div>

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
            </div>
          </div>

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
                    <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                      No transactions found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      );
    }
    if (!user) {
      return null;
    }

    switch (activeTab) {
      case 'details':
        return (
          <>
            <div className="flex flex-col">
              <UserInfoSection user={user} t={t} />
              {user.agentData && <AgentDataSection agentData={user.agentData} t={t} />}
            </div>
          </>
        );

      case 'benefits':
        if (!user.benefits) {
          return <p className="text-center text-gray-500">{t('SignupRequests.Empty')}</p>;
        }
        return <BenefitsSection benefits={user.benefits} getBenefitName={getBenefitName} t={t} />;

      case 'createdBy':
        if (!user.createdBy) {
          return <p className="text-center text-gray-500">{t('SignupRequests.Empty')}</p>;
        }
        return (
          <CreatedBySection
            createdBy={user.createdBy}
            handleHistoryClick={handleHistoryClick}
            t={t}
          />
        );

      case 'userCard':
        return userCard ? (
          <TransactionsSection pinfl={user?.pinfl} />
        ) : (
          <p className="text-center text-gray-500">{t('SignupRequests.NoTransactionsAvailable')}</p>
        );

      case 'signup':
        if (!user.signupRequestId) {
          return <p className="text-center text-gray-500">{t('SignupRequests.Empty')}</p>;
        }
        return (
          <div className="text-center">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-full transition"
              onClick={() => onOpenSignupRequest(user.signupRequestId!)}
            >
              {t('Buttons.viewSignupDetails')}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`z-[999] fixed inset-0 flex items-center justify-end bg-[rgba(11,11,34,0.4)] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'rgba(11,11,34,0.4)' }}
    >
      <div
        ref={modalRef}
        className={`relative bg-white w-full max-w-lg md:max-w-2xl lg:max-w-4xl shadow-xl overflow-y-auto h-full
          transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="p-12 flex justify-between items-center">
          <h1 className="text-xl">{t('UserManagement.modalTitle')}</h1>
          <button
            type="button"
            className="cursor-pointer text-neutral-900"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="px-12 py-6 flex items-center gap-4">
          {user?.photoUrl && (
            <Image
              src={user.photoUrl || placeholderUserImage}
              width={72}
              height={72}
              alt="User Avatar"
              className="w-18 h-18 rounded-full shadow-md object-cover"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
          </div>
        </div>

        <div className="flex gap-6 px-12 overflow-x-auto">
          {[
            { id: 'details', title: t('UserManagement.modalTitle') },
            { id: 'benefits', title: t('UserManagement.benefits.title') },
            { id: 'createdBy', title: t('UserManagement.details.createdBy') },
            { id: 'userCard', title: t('UserManagement.transactions') },
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : ' text-neutral-900'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="px-12 py-6 flex-1 overflow-y-auto">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
