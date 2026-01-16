/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 *            createdAt:
 *              type: string
 *              format: date-time
 *            updatedAt:
 *              type: string
 *              format: date-time
 *      ClassroomInput:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            name:
 *              type: string
 *              description: Classroom name.
 */
import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a new classroom
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassroomInput'
 *     responses:
 *       201:
 *         description: The created classroom
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       400:
 *         description: Bad request (e.g., classroom already exists or validation error)
 *       401:
 *         description: Unauthorized
 */
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Classroom name is required' });
        }

        const classroom = await classroomService.createClassroom(name.trim());
        res.status(201).json(classroom);
    } catch (error) {
        next(error);
    }
});

export { classroomRouter };

