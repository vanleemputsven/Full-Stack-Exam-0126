import database from '../util/database';
import { Classroom } from '../model/classroom';

const createClassroom = async (classroom: Classroom): Promise<Classroom> => {
    try {
        const classroomPrisma = await database.classroom.create({
            data: { name: classroom.name },
        });
        return Classroom.from(classroomPrisma);
    } catch (error) {
        console.error('Error creating classroom:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const getClassroomByName = async (name: string): Promise<Classroom | null> => {
    try {
        const classroomPrisma = await database.classroom.findUnique({
            where: { name },
        });
        return classroomPrisma ? Classroom.from(classroomPrisma) : null;
    } catch (error) {
        console.error('Error fetching classroom by name:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createClassroom,
    getClassroomByName,
};

