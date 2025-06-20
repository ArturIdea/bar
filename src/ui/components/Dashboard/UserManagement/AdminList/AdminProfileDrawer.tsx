import React from 'react';
import Image from 'next/image';
import { ArrowRight, XIcon } from 'lucide-react';

interface AdminProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  admin: any; // Replace with Admin type if available
}

const DEFAULT_AVATAR = '/images/default-avatar.png'; // Use a default avatar path

export function AdminProfileDrawer({ isOpen, onClose, admin }: AdminProfileDrawerProps) {
  if (!isOpen || !admin) {
    return null;
  }

  // Use the firstName/lastName initials if no avatar
  const avatarUrl = admin.avatarUrl || DEFAULT_AVATAR;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close drawer overlay"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClose()}
      />
      {/* Side Drawer */}
      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out w-1/2 max-w-full z-50 ${{
          true: 'translate-x-0',
          false: 'translate-x-full',
        }[isOpen.toString()]}`}
        style={{ minWidth: 400 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-10 pt-10">
          <h2 className="text-xl font-semibold text-[#0B0B22]">Profile</h2>
          <button
            type="button"
            className="text-2xl text-gray-400 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            <XIcon className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
        {/* Content */}
        <div className="flex flex-col h-full px-10 pb-10">
          <div className="flex items-center gap-6 mb-10 mt-10">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0B0B22]">{admin.firstName} {admin.lastName}</div>
              {/* <div className="text-gray-500 text-base mt-1">{admin.email || '-'}</div> */}
            </div>
          </div>
          <div className="flex gap-24 mb-10">
            <div className="flex flex-col gap-8 min-w-[200px]">
              <div>
                <div className="text-gray-400 text-sm">Mobile Number</div>
                <div className="text-[#0B0B22] text-base font-medium">{admin.attributes?.phone?.[0] || '-'}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Role</div>
                <div className="text-[#0B0B22] text-base font-medium">{admin.enabled ? 'Admin' : 'Inactive'}</div>
              </div>
            </div>
            <div className="flex flex-col gap-8 min-w-[240px]">
              <div>
                <div className="text-gray-400 text-sm">Email Address</div>
                <div className="text-[#0B0B22] text-base font-medium">{admin.email || '-'}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Organisation</div>
                <div className="text-[#0B0B22] text-base font-medium">{admin.attributes?.organization?.[0] || '-'}</div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="hidden items-center gap-2 bg-[#00668C] text-white px-8 py-3 rounded-full text-base font-medium w-fit mt-2 shadow hover:bg-[#005377] transition"
          >
            History Logbook <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
} 