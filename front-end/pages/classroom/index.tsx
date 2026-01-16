import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Header from '@components/header';
import ClassroomForm from '@components/classroom/ClassroomForm';
import ClassroomService from '@services/ClassroomService';
import { User, Classroom } from '@types';

const ClassroomPage: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const userStr = sessionStorage.getItem('loggedInUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setLoggedInUser(user);
        if (user.role !== 'admin') {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async (name: string): Promise<Classroom> => {
    const userStr = sessionStorage.getItem('loggedInUser');
    if (!userStr) {
      throw new Error(t('classroom.error.unauthorized'));
    }

    const user = JSON.parse(userStr);
    const token = user.token;

    return await ClassroomService.createClassroom(name, token);
  };

  const handleSuccess = (classroom: Classroom) => {
    // Formulier wordt automatisch gereset door het component
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{t('classroom.title')}</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <p>{t('general.loading') || 'Loading...'}</p>
        </main>
      </>
    );
  }

  if (!loggedInUser || loggedInUser.role !== 'admin') {
    return (
      <>
        <Head>
          <title>{t('classroom.title')}</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="max-w-md m-auto">
            <div className="bg-red-100 text-red-800 border border-red-400 p-4 rounded">
              {t('classroom.error.unauthorized')}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('classroom.title')}</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">{t('classroom.title')}</h1>
        <ClassroomForm onSubmit={handleSubmit} onSuccess={handleSuccess} />
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default ClassroomPage;

