import database from '../util/database';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        const teachersPrisma = await database.teacher.findMany({
            include: {
                user: true,
            },
        });
        return teachersPrisma.map((teacherPrisma) => Teacher.from(teacherPrisma));
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateLearningPath = async (teacherId: number, learningPath: string): Promise<Teacher> => {
    try {
        const updatedTeacherPrisma = await database.teacher.update({
            where: { id: teacherId },
            data: { learningPath },
            include: {
                user: true,
            },
        });
        return Teacher.from(updatedTeacherPrisma);
    } catch (error) {
        console.error('Error updating learning path:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTeachers,
    updateLearningPath,
};
