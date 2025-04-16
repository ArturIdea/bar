import { useState } from 'react';
import { useTranslations } from 'next-intl';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';

export const UserFilterModal = ({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (signUpRequestId?: string, documentTypeId?: string, pinflSearch?: string) => void;
}) => {
  const [signupReqtId, setSignupReqtId] = useState<string>('');
  const [pinfl, setPinfl] = useState<string>('');
  const [docTypeId, setDocTypeId] = useState<string>('');
  const t = useTranslations();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);

  const handleApply = () => {
    onApply(signupReqtId || undefined, docTypeId || undefined, pinfl || undefined);
    onClose();
  };

  const handleClearFilters = () => {
    setPinfl('');
    setDocTypeId('');
    setSignupReqtId('');
    onApply(undefined, undefined, undefined);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50">
      <div ref={modalRef} className="bg-white w-[450px] rounded-4xl p-6 shadow-lg">
        <h2 className="text-center text-xl pb-4">{t('Filter.filterBy')}:</h2>

        <div className="flex flex-col gap-6">
          {/* PINFL Input */}
          <div>
            <label className="text-gray-400 mb-2">{t('Filter.pinfl')}</label>
            <input
              value={pinfl}
              onChange={(e) => setPinfl(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-xl p-2"
            />
          </div>

          {/* Signup Request ID Input */}
          <div>
            <label className="text-gray-400 mb-2">{t('Filter.signupReqId')}</label>
            <input
              value={signupReqtId}
              onChange={(e) => setSignupReqtId(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-xl p-2"
            />
          </div>

          {/* Document Type ID Input */}
          <div>
            <label className="text-gray-400 mb-2">{t('Filter.docTypeId')}</label>
            <input
              value={docTypeId}
              onChange={(e) => setDocTypeId(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-xl p-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end items-center gap-3">
          <button
            type="button"
            className="border-2 bg-primary text-white px-4 py-2 rounded-full cursor-pointer"
            onClick={handleApply}
          >
            {t('Filter.applyFilters')}
          </button>
          <button
            type="button"
            className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-full cursor-pointer"
            onClick={handleClearFilters}
          >
            {t('Filter.clearFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};
