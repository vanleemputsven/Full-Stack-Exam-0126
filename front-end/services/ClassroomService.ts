import { Classroom } from '@types';

const createClassroom = async (name: string, token?: string): Promise<Classroom> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/classrooms', {
    method: 'POST',
    headers,
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || 'Failed to create classroom';
    const error = new Error(errorMessage);
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
};

const ClassroomService = {
  createClassroom,
};

export default ClassroomService;

