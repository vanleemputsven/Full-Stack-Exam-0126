import { Classroom } from '../model/classroom';
import classroomDB from '../repository/classroom.db';

const createClassroom = async (name: string): Promise<Classroom> => {
    const existingClassroom = await classroomDB.getClassroomByName(name);

    if (existingClassroom) {
        throw new Error(`Classroom with name "${name}" already exists.`);
    }

    const classroom = new Classroom({ name });
    return await classroomDB.createClassroom(classroom);
};

export default {
    createClassroom,
};

