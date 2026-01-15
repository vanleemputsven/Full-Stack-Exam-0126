import Header from '@components/header';
import TeacherOverview from '@components/teachers/TeacherOverview';
import TeacherService from '@services/TeacherService';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import useSWR from 'swr';
import { mutate } from 'swr';

const Teachers: React.FC = () => {
  const fetcher = async (key: string) => {
    return await TeacherService.getAllTeachers();
  };

  const { data, isLoading, error } = useSWR('Teachers', fetcher);

  const handleUpdate = () => {
    mutate('Teachers');
  };

  return (
    <>
      <Head>
        <title>Teachers</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Teachers</h1>

        <section className="mt-5 w-full max-w-4xl">
          {error && <p className="text-red-500">{error.message || 'An error occurred'}</p>}
          {isLoading && <p>Loading...</p>}
          {data && <TeacherOverview teachers={data} onUpdate={handleUpdate} />}
        </section>
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

export default Teachers;
