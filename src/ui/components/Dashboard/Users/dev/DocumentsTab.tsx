import { Calendar, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UserDocument } from '@/domain/users/dev/entities/UserDocument';

export const DocumentsTab = ({ documents }: { documents: UserDocument[] }) => {
  const t = useTranslations();
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-primary">{t('Dev.documents')}</h2>

      {documents.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center border border-gray-100">
          <p className="text-gray-500">No documents found for this user</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 border border-gray-100 flex items-start"
            >
              <div className="bg-primary/10 p-3 rounded-lg mr-4">
                <FileText className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-primary mb-1">{doc.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                  <span>
                    Uploaded:{' '}
                    {new Date(doc.createdAt).toLocaleString('uz-UZ', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
