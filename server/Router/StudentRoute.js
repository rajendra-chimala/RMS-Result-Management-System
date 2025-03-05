const express = require('express');
const { getStudentResult, addStudent, addManyStudents, getAll, deleteById } = require('../Controller/StudentController');
const router = express.Router();


router.get('/:rollNo',getStudentResult);
router.post('/add',addStudent);
router.post('/add-many',addManyStudents);
router.get('/all/student',getAll);
router.delete('/student/:rollNo',deleteById)




module.exports = router;