import { Teacher } from '@types';

const getAllTeachers = async (): Promise<Teacher[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/teachers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch teachers');
  }

  return response.json();
};

const updateLearningPath = async (teacherId: number, learningPath: string): Promise<Teacher> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/teachers/${teacherId}/learningpath?learningPath=${encodeURIComponent(learningPath)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update learning path');
  }

  return response.json();
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
