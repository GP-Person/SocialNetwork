import { ObjectId } from 'mongodb';
import { Thought, Course } from '../models/index.js';
// Aggregate function to get number of students overall
export const headCount = async () => {
    const numberOfThoughts = await Thought.aggregate()
        .count('studentCount');
    return numberOfThoughts;
};
// Aggregate function for getting the overall grade using $avg
export const grade = async (studentId) => Thought.aggregate([
    // only include the given student by using $match
    { $match: { _id: new ObjectId(studentId) } },
    {
        $unwind: '$assignments',
    },
    {
        $group: {
            _id: new ObjectId(studentId),
            overallGrade: { $avg: '$assignments.score' },
        },
    },
]);
/**
 * GET All Thoughts /students
 * @returns an array of Thoughts
*/
export const getAllThoughts = async (_req, res) => {
    try {
        const students = await Thought.find();
        const studentObj = {
            students,
            headCount: await headCount(),
        };
        res.json(studentObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Thought based on id /students/:id
 * @param string id
 * @returns a single Thought object
*/
export const getThoughtById = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await Thought.findById(studentId);
        if (student) {
            res.json({
                student,
                grade: await grade(studentId)
            });
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * POST Thought /students
 * @param object student
 * @returns a single Thought object
*/
export const createThought = async (req, res) => {
    try {
        const student = await Thought.create(req.body);
        res.json(student);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
/**
 * DELETE Thought based on id /students/:id
 * @param string id
 * @returns string
*/
export const deleteThought = async (req, res) => {
    try {
        const student = await Thought.findOneAndDelete({ _id: req.params.studentId });
        if (!student) {
            return res.status(404).json({ message: 'No such student exists' });
        }
        const User = await Course.findOneAndUpdate({ students: req.params.studentId }, { $pull: { students: req.params.studentId } }, { new: true });
        if (!User) {
            return res.status(404).json({
                message: 'Thought deleted, but no Users found',
            });
        }
        return res.json({ message: 'Thought successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
/**
 * POST Assignment based on /students/:studentId/assignments
 * @param string id
 * @param object assignment
 * @returns object student
*/
export const addAssignment = async (req, res) => {
    console.log('You are adding an assignment');
    console.log(req.body);
    try {
        const student = await Thought.findOneAndUpdate({ _id: req.params.studentId }, { $addToSet: { assignments: req.body } }, { runValidators: true, new: true });
        if (!student) {
            return res
                .status(404)
                .json({ message: 'No student found with that ID :(' });
        }
        return res.json(student);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
/**
 * DELETE Assignment based on /students/:studentId/assignments
 * @param string assignmentId
 * @param string studentId
 * @returns object student
*/
export const removeAssignment = async (req, res) => {
    try {
        const student = await Thought.findOneAndUpdate({ _id: req.params.studentId }, { $pull: { assignments: { assignmentId: req.params.assignmentId } } }, { runValidators: true, new: true });
        if (!student) {
            return res
                .status(404)
                .json({ message: 'No student found with that ID :(' });
        }
        return res.json(student);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
