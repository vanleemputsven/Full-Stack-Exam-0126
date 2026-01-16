import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { StatusMessage, Classroom } from '@types';

type Props = {
  onSubmit: (name: string) => Promise<Classroom>;
  onSuccess?: (classroom: Classroom) => void;
};

const ClassroomForm: React.FC<Props> = ({ onSubmit, onSuccess }: Props) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;
    clearErrors();

    if (!name || name.trim() === '') {
      setNameError(t('classroom.name.required'));
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      return;
    }

    const nameValue = name.trim();
    setIsSubmitting(true);
    try {
      const classroom = await onSubmit(nameValue);
      
      // Probeer interpolatie, als dat niet werkt gebruik handmatige vervanging
      let successMessage = t('classroom.success', { 
        name: classroom.name || nameValue, 
        id: classroom.id?.toString() || 'unknown' 
      });
      
      // Fallback: als interpolatie niet werkt, vervang handmatig
      if (successMessage.includes('{{name}}') || successMessage.includes('{name}')) {
        successMessage = successMessage
          .replace(/\{\{name\}\}/g, classroom.name || nameValue)
          .replace(/\{name\}/g, classroom.name || nameValue)
          .replace(/\{\{id\}\}/g, classroom.id?.toString() || 'unknown')
          .replace(/\{id\}/g, classroom.id?.toString() || 'unknown');
      }
      
      setStatusMessages([
        {
          message: successMessage,
          type: 'success',
        },
      ]);
      setName('');
      if (onSuccess) {
        onSuccess(classroom);
      }
    } catch (error: any) {
      // Bij error behoud de ingevulde waarde (name wordt niet leeggemaakt)
      let errorMessage: string;
      
      // Format error message voor "already exists" errors - gebruik altijd i18n
      if (error.message?.includes('already exists')) {
        errorMessage = t('classroom.error.exists', { name: nameValue });
        
        // Fallback: als interpolatie niet werkt, vervang handmatig
        if (errorMessage.includes('{{name}}') || errorMessage.includes('{name}')) {
          errorMessage = errorMessage
            .replace(/\{\{name\}\}/g, nameValue)
            .replace(/\{name\}/g, nameValue);
        }
      } else {
        errorMessage = error.message || t('classroom.error.general');
      }
      
      setStatusMessages([
        {
          message: errorMessage,
          type: 'error',
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md m-auto">
      {statusMessages.length > 0 && (
        <div className="mb-4">
          {statusMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded ${
                msg.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-400'
                  : 'bg-red-100 text-red-800 border border-red-400'
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('classroom.name.label')}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('classroom.name.placeholder')}
            className={`w-full px-3 py-2 border rounded-md ${
              nameError ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={isSubmitting}
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-600">{nameError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '...' : t('classroom.button')}
        </button>
      </form>
    </div>
  );
};

export default ClassroomForm;

