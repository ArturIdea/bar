'use client';

import { useTranslations } from 'next-intl';

export function AgentList() {
  const t = useTranslations();

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Agent.fullName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Agent.branchCode')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Agent.district')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Agent.primaryPhone')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('UserManagement.details.action')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">BR001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Central District
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">+1234567890</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button type="button" className="text-indigo-600 hover:text-indigo-900">
                    {t('Buttons.viewDetails')}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
