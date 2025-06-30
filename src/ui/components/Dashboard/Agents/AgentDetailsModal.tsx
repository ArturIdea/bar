import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import placeholderUserImage from '@/../public/images/icons/dashboard/placeholderUserImage.jpg';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';
import { HistoryModal } from './HistoryModal';
import OnboardingStatus from './OnboardingStatus';
import { formatLastLogin } from '@/lib/utils';

interface AgentDetailsModalProps {
  agent: {
    lastLogin: string | null | undefined;
    userId: string;
    firstName: string;
    lastName: string;
    pinfl: string;
    createdAt: string;
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    dailyAverageSuccessfulRequests: number;
    email: string | null;
    nationality: string;
    citizenship: string;
    birthCountry: string;
    dateOfBirth: string;
    socialNumber: string;
    photoUrl?: string;
  };
  onClose: () => void;
}

const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, onClose }) => {
  const t = useTranslations();
  const modalRef = useClickOutside<HTMLDivElement>(handleClose);
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [isVisible, setIsVisible] = useState(false);

  // Default date range (last 30 days)
  const defaultToDate = new Date().toISOString().split('T')[0];
  const defaultFromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [fromDate] = useState(defaultFromDate);
  const [toDate] = useState(defaultToDate);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // match transition duration
  }

  const PersonalInfoSection = ({ agent }: { agent: AgentDetailsModalProps['agent'] }) => {
    const fields = [
      { label: 'Email', value: agent?.email || 'N/A' },
      { label: 'PINFL No', value: agent?.pinfl || 'N/A' },
      { label: 'Nationality', value: agent?.nationality || 'N/A' },
      { label: 'Citizenship', value: agent?.citizenship || 'N/A' },
      { label: 'Birth Country', value: agent?.birthCountry || 'N/A' },
      { label: 'Date Of Birth', value: agent?.dateOfBirth || 'N/A' },
      { label: 'Social Number', value: agent?.socialNumber || 'N/A' },
      { label: 'Created At', value: agent?.createdAt ? new Date(agent.createdAt).toLocaleString() : 'N/A' },
      { label: 'Total Requests', value: agent.totalRequests || 'N/A' },
      { label: 'Successful Requests', value: agent.successfulRequests || 'N/A' },
      { label: 'Failed Requests', value: agent.failedRequests || 'N/A' },
      {
        label: 'Daily Average',
        value: agent.dailyAverageSuccessfulRequests
          ? agent.dailyAverageSuccessfulRequests.toFixed(2)
          : 'N/A',
      },
    ];

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[#8B8BA2] text-[14px] font-normal leading-normal tracking-[0px]">{label}</p>
              <p className="text-[#0B0B22] text-[14px] font-normal leading-normal">{value}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoSection agent={agent} />;
      case 'transactions':
        return <HistoryModal createdById={agent.userId} onBack={() => setActiveTab('personal')} />;
      case 'onboarding':
        return (
          <OnboardingStatus
            userId={agent.userId}
            fromDate={fromDate}
            toDate={toDate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`z-[999] fixed inset-0 flex items-center justify-end bg-[rgba(11,11,34,0.4)] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        ref={modalRef}
        className={`relative bg-white w-full max-w-lg md:max-w-2xl lg:max-w-4xl shadow-xl overflow-y-auto h-full transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-12 flex justify-between items-center">
          <h1 className="text-xl">{t('Agents.title')}</h1>
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
          <Image
            src={agent.photoUrl || placeholderUserImage}
            width={72}
            height={72}
            alt="Agent Avatar"
            className="w-18 h-18 rounded-full shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {agent.firstName || ''} {agent.lastName || ''}
            </h2>
          </div>
          <div className="flex-1 text-right">
            <h3>Last Login</h3>
            <h3>{formatLastLogin(agent.lastLogin)}</h3>
          </div>
        </div>

        <div className="flex gap-6 px-12 overflow-x-auto">
          {[
            { id: 'personal', title: "Profile" },
            { id: 'transactions', title: "History" },
            { id: 'onboarding', title: "Onboarding Status" },
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer whitespace-nowrap ${
                activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-neutral-900'
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

export default AgentDetailsModal;
