const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
  {
    id: 1,
    name: 'Pranati Rao',
    rollNo: '23071A0547',
    course: 'Computer Science'
  },
  {
    id: 2,
    name: 'Anita Sharma',
    rollNo: '23071A0540',
    course: 'Information Technology'
  }
];

app.get('/students', (req, res) => {
  res.json({
    success: true,
    message: 'Students retrieved successfully',
    data: students
  });
});

app.get('/students/:id', (req, res) => {
  const student = students.find((item) => item.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  res.json({
    success: true,
    message: 'Student retrieved successfully',
    data: student
  });
});

app.post('/students', (req, res) => {
  const { name, rollNo, course } = req.body;

  if (!name || !rollNo || !course) {
    return res.status(400).json({
      success: false,
      message: 'name, rollNo, and course are required'
    });
  }

  const newStudent = {
    id: students.length ? Math.max(...students.map((item) => item.id)) + 1 : 1,
    name,
    rollNo,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student added successfully',
    data: newStudent
  });
});

app.patch('/students/:id', (req, res) => {
  const student = students.find((item) => item.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  const { name, rollNo, course } = req.body;

  if (name !== undefined) student.name = name;
  if (rollNo !== undefined) student.rollNo = rollNo;
  if (course !== undefined) student.course = course;

  res.json({
    success: true,
    message: 'Student updated successfully',
    data: student
  });
});

app.delete('/students/:id', (req, res) => {
  const studentIndex = students.findIndex((item) => item.id === Number(req.params.id));

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
