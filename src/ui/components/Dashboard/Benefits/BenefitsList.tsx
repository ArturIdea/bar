'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import hugIcon from '@/../public/images/icons/dashboard/hugIcon.svg';

interface Benefit {
  id: string;
  title: string;
  amount: number;
  users: number;
  status: 'ACTIVE' | 'EXPIRED';
}

export default function BenefitsList() {
  const t = useTranslations();
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [activeFilter, setActiveFilter] = useState<'ACTIVE' | 'EXPIRED' | null>('ACTIVE');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBenefits([
      { id: '1', title: 'Child allowance', amount: 5000, users: 30420, status: 'ACTIVE' },
      { id: '2', title: 'Material assistance', amount: 5000, users: 94420, status: 'ACTIVE' },
      { id: '3', title: 'Age-related allowance', amount: 5000, users: 51210, status: 'ACTIVE' },
      { id: '4', title: 'Voluntary old-age pension', amount: 5000, users: 83240, status: 'ACTIVE' },
      { id: '5', title: 'Disability allowance', amount: 5000, users: 23250, status: 'ACTIVE' },
      {
        id: '6',
        title: 'Monthly Material assistance',
        amount: 5000,
        users: 54520,
        status: 'ACTIVE',
      },
      { id: '7', title: 'Voucher', amount: 5000, users: 93020, status: 'ACTIVE' },
      { id: '8', title: 'Allowance', amount: 5000, users: 53750, status: 'ACTIVE' },
      { id: '9', title: 'Allowance', amount: 5000, users: 83420, status: 'ACTIVE' },
      {
        id: '10',
        title: 'One-time material assistance',
        amount: 5000,
        users: 58240,
        status: 'ACTIVE',
      },
      {
        id: '11',
        title: 'One-time material assistance',
        amount: 5000,
        users: 42520,
        status: 'ACTIVE',
      },
      { id: '12', title: "Survivor's pension", amount: 5000, users: 89570, status: 'ACTIVE' },
      {
        id: '13',
        title: "Voluntary survivor's pension",
        amount: 5000,
        users: 87490,
        status: 'ACTIVE',
      },
      {
        id: '14',
        title: 'Monthly and One-time social payments',
        amount: 5000,
        users: 39750,
        status: 'ACTIVE',
      },
      { id: '15', title: 'Child allowance', amount: 5000, users: 12345, status: 'EXPIRED' },
      { id: '16', title: 'Material assistance', amount: 5000, users: 13215, status: 'EXPIRED' },
      { id: '17', title: 'Age-related allowance', amount: 5000, users: 45345, status: 'EXPIRED' },
    ]);
    setLoading(false);
  }, []);

  const filteredBenefits = activeFilter
    ? benefits.filter((benefit) => benefit.status === activeFilter)
    : benefits;

  return (
    <div className="">
      <div className="flex items-center py-4 px-6 justify-between border-b">
        <div className="flex gap-4">
          <button
            type="button"
            className={`px-8 py-2 rounded-full ${activeFilter === 'ACTIVE' ? 'bg-[#08678E] text-white' : 'text-[#08678E] bg-gray-100'}`}
            onClick={() => setActiveFilter('ACTIVE')}
          >
            {t('Buttons.active')}
          </button>
          <button
            type="button"
            className={`px-8 py-2 rounded-full ${activeFilter === 'EXPIRED' ? 'bg-[#08678E] text-white' : 'text-[#08678E] bg-gray-100'}`}
            onClick={() => setActiveFilter('EXPIRED')}
          >
            {t('Buttons.expired')}
          </button>
        </div>
      </div>

      <div className="relative p-6">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBenefits.map((benefit) => (
              <div
                key={benefit.id}
                className={`border rounded-xl p-4 flex items-center justify-between ${
                  benefit.status === 'EXPIRED' ? 'bg-gray-100 ' : 'bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex items-center gap-4">
                    <div className={benefit.status === 'EXPIRED' ? 'opacity-50' : ''}>
                      <Image src={hugIcon} alt="Hug Icon" />
                    </div>
                    <div className={benefit.status === 'EXPIRED' ? 'text-gray-500' : ''}>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <div className="flex items-center gap-2">
                        <p className="font-bold">лв</p>
                        <div className="border-r-2 h-3" />
                        <span
                          className={
                            benefit.status === 'EXPIRED' ? 'text-gray-500' : 'text-green-500'
                          }
                        >
                          {benefit.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`text-center ${
                    benefit.status === 'EXPIRED' ? 'bg-gray-200' : 'bg-gray-100'
                  } w-[87px] py-2 rounded-xl`}
                >
                  <div
                    className={`font-bold ${
                      benefit.status === 'EXPIRED' ? 'text-gray-500' : 'text-gray-700'
                    }`}
                  >
                    {(benefit.users / 1000).toFixed(2)}k
                  </div>
                  <div className="text-gray-500">Users</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
