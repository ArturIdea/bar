import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { useAddAdminUser } from '@/ui/hooks/ui/useAddAdminUser';
import { useClickOutside } from '@/ui/hooks/ui/useClickOutside';

interface AddAdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddAdminDrawer({ isOpen, onClose, onSuccess }: AddAdminDrawerProps) {
  const t = useTranslations();
  const { addAdminUser, loading, error } = useAddAdminUser();
  const drawerRef = useClickOutside<HTMLDivElement>(onClose);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    organization: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAdminUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        enabled: true,
        attributes: {
          phone: formData.phone,
          organization: formData.organization,
        },
      });
      onSuccess();
      onClose();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="z-[999] fixed inset-0 flex items-center justify-end bg-primary/5 backdrop-blur-md transition-opacity">
      <div ref={drawerRef} className="relative bg-white w-full max-w-lg md:max-w-2xl lg:max-w-4xl shadow-xl overflow-y-auto h-full">
        <div className="p-12 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t('UserManagement.navbarTitle.addAdmin')}</h1>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-neutral-900"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="px-12 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 font-light mb-1">
                  {t('UserProfile.firstName')}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-light mb-1">
                  {t('UserProfile.lastName')}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-light mb-1">
                {t('UserProfile.emailAddress')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-light mb-1">
                {t('UserProfile.username')}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-light mb-1">
                {t('UserProfile.phoneNumber')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-light mb-1">
                {t('UserManagement.organisation')}
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t('Filter.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
              >
                {loading ? t('Filter.done') : t('Buttons.addUser')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 