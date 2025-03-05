const Student = require('../Model/User');


const getStudentResult = async (req,res)=>{
    try {
        const student = await Student.findOne({ rollNo: req.params.rollNo });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}


const addStudent = async (req, res) => {
    try {
      const { rollNo, name, subjects } = req.body;
  
      // Calculate total marks and percentage
      let total = 0;
      let maxTotal = 0;
  
      subjects.forEach((subject) => {
        total += subject.marks;
        maxTotal += subject.maxMarks;
      });
  
      const percentage = (total / maxTotal) * 100;
  
      const newStudent = new Student({
        rollNo,
        name,
        subjects,
        total,
        percentage,
      });
  
      await newStudent.save();
      res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
      res.status(500).json({ message: "Error adding student", error: error.message });
    }
  };


  const addManyStudents = async (req, res) => {
    try {
      const studentsData = req.body.students; // Expecting an array of students
  
      const studentsToInsert = studentsData.map((student) => {
        let total = 0;
        let maxTotal = 0;
  
        student.subjects.forEach((subject) => {
          total += subject.marks;
          maxTotal += subject.maxMarks;
        });
  
        const percentage = (total / maxTotal) * 100;
  
        return {
          rollNo: student.rollNo,
          name: student.name,
          subjects: student.subjects,
          total,
          percentage,
        };
      });
  
      const addedStudents = await Student.insertMany(studentsToInsert);
  
      res.status(201).json({
        message: "Students added successfully",
        students: addedStudents,
      });
    } catch (error) {
      res.status(500).json({ message: "Error adding students", error: error.message });
    }
  };


  const getAll = async (req,res)=>{
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students' });
    }

  }

  const deleteById = async (req,res)=>{
    try {
      const { rollNo } = req.params;
      const deletedStudent = await Student.findOneAndDelete({ rollNo });
  
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.json({ message: 'Student deleted successfully',deletedStudent });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student' });
    }
  }




module.exports = {getStudentResult,addStudent,addManyStudents,getAll,deleteById}