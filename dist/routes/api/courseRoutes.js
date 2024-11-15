import { Router } from 'express';
const router = Router();
import { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, } from '../../controllers/userController.js';
// /api/Users
router.route('/').get(getAllCourses).post(createCourse);
// /api/Users/:UserId
router
    .route('/:UserId')
    .get(getCourseById)
    .put(updateCourse)
    .delete(deleteCourse);
export { router as UserRouter };
