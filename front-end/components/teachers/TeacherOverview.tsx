import LearningPath from '@components/learning-path';
import { Teacher, User } from '@types';
import { useEffect, useState } from 'react';

type Props = {
  teachers: Teacher[];
  onUpdate?: () => void;
};

const TeacherOverview: React.FC<Props> = ({ teachers, onUpdate }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    const userStr = sessionStorage.getItem('loggedInUser');
    if (userStr) {
      setLoggedInUser(JSON.parse(userStr));
    }
  }, []);

  const isAdmin = loggedInUser?.role === 'admin';

  return (
    <>
      <section className="mt-5">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th scope="col" className="border border-gray-300 px-4 py-2 text-left">
                Learning path
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => {
              const fullName = `${teacher.user.firstName} ${teacher.user.lastName}`;
              return (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{fullName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {isAdmin ? (
                      <LearningPath
                        teacherId={teacher.id}
                        learningPath={teacher.learningPath}
                        onUpdate={onUpdate}
                      />
                    ) : (
                      <span>{teacher.learningPath}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TeacherOverview;
