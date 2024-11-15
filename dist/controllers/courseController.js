import { Course, Thought } from '../models/index.js';
/**
 * GET All Courses /Users
 * @returns an array of Courses
*/
export const getAllCourses = async (_req, res) => {
    try {
        const Users = await Course.find();
        res.json(Users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Course based on id /User/:id
 * @param string id
 * @returns a single Course object
*/
export const getCourseById = async (req, res) => {
    const { UserId } = req.params;
    try {
        const student = await Course.findById(UserId);
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({
                message: 'Volunteer not found'
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
* POST Course /Users
* @param object username
* @returns a single Course object
*/
export const createCourse = async (req, res) => {
    const { User } = req.body;
    try {
        const newCourse = await Course.create({
            User
        });
        res.status(201).json(newCourse);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
 * PUT Course based on id /Users/:id
 * @param object id, username
 * @returns a single Course object
*/
export const updateCourse = async (req, res) => {
    try {
        const User = await Course.findOneAndUpdate({ _id: req.params.UserId }, { $set: req.body }, { runValidators: true, new: true });
        if (!User) {
            res.status(404).json({ message: 'No User with this id!' });
        }
        res.json(User);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
* DELETE Course based on id /Users/:id
* @param string id
* @returns string
*/
export const deleteCourse = async (req, res) => {
    try {
        const User = await Course.findOneAndDelete({ _id: req.params.UserId });
        if (!User) {
            res.status(404).json({
                message: 'No User with that ID'
            });
        }
        else {
            await Thought.deleteMany({ _id: { $in: User.students } });
            res.json({ message: 'Course and students deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
