export type Teacher = {
  id: number;
  user: User;
  learningPath: string;
};

export type User = {
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
};

export type StatusMessage = {
  message: string;
  type: 'error' | 'success';
};

export type Classroom = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};
