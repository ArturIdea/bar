import { useState } from 'react';

interface Benefit {
  id: number;
  externalId: string;
  pinfl: string;
  appointedPinfl: string;
  status: string;
  benefitType: {
    id: number;
    name: {
      qr: string;
      ru: string;
      'uz-cyrl': string;
      'uz-latn': string;
    };
    amount: {
      priceValue: number;
    };
    docOn: string;
  };
  amount: {
    priceValue: number;
  };
  deductionName: string | null;
  deductionAmount: {
    priceValue: number;
  };
  deductionPercentage: {
    priceValue: number;
  };
  deductionStart: string | null;
  deductionEnd: string | null;
  startedOn: string;
  endedOn: string;
  cancelledOn: string | null;
  monthOn: string | null;
}

interface BenefitsInfoProps {
  benefits?: Benefit[];
}

export const BenefitsInfo = ({ benefits = [] }: BenefitsInfoProps) => {
  const [tab, setTab] = useState<'ACTIVE' | 'EXPIRED'>('ACTIVE');
  const activeBenefits = benefits.filter((benefit) => benefit.status === 'ACTIVE');
  const expiredBenefits = benefits.filter((benefit) => benefit.status === 'EXPIRED');
  const selectedBenefits = tab === 'ACTIVE' ? activeBenefits : expiredBenefits;

  return (
    <div className="bg-white">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-full justify-evenly p-2 mb-4">
        {(['ACTIVE', 'EXPIRED'] as const).map((key) => (
          <button
            key={key}
            type='submit'
            onClick={() => setTab(key)}
            className={`flex-1 py-2 px-9 rounded-full text-center whitespace-nowrap font-semibold transition-all  ${
              tab === key ? 'bg-[#066A93] text-white' : 'text-[#066A93] hover:bg-blue-50'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Benefit Cards */}
      {selectedBenefits.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 capitalize">
          No {tab.toLowerCase()} benefits found.
        </p>
      ) : (
        <div className="space-y-4">
          {selectedBenefits.map((benefit) => {
            const benefitName = benefit.benefitType.name['uz-latn'] || 
                              benefit.benefitType.name.ru || 
                              benefit.benefitType.name['uz-cyrl'] || 
                              benefit.benefitType.name.qr;

            return (
              <div
                key={benefit.id}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  <p className="font-medium text-gray-900">{benefitName}</p>
                </div>
                <div className="bg-[#08678E14] px-4 py-2 rounded-lg text-center min-w-[120px]">
                  <p className="text-lg font-semibold text-gray-900">
                    {benefit.amount.priceValue.toLocaleString()}
                  </p>
                  <p className="text-md text-gray-500">Total Amount</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
