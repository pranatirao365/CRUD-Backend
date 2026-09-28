# Activity 1: Simple Backend Project with CRUD Operations and APIs

## Aim

To create a simple backend project using Node.js and Express.js and implement CRUD operations for student records through REST APIs.

## Software/Tools Required

- Node.js
- Visual Studio Code
- Express.js
- REST Client extension in VS Code or Postman

## Brief Description of the Project

This project is a student management API. It supports adding, viewing, updating, and deleting student records. The data is stored in an in-memory array, so it is reset when the server restarts.

## Project Structure

```text
student-crud-api/
|
|-- server.js
|-- package.json
|-- package-lock.json
|-- requests.http
`-- LAB_RECORD.md
```

## Complete Source Code

### server.js

```javascript
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
```

## API Details

Start the server before testing:

```bash
npm install
node server.js
```

Base URL: `http://localhost:3000`

### GET

**Get all students**

```text
GET http://localhost:3000/students
```

**Get one student**

```text
GET http://localhost:3000/students/1
```

### POST

```text
POST http://localhost:3000/students
Content-Type: application/json
```

Request body:

```json
{
  "name": "Ravi Kumar",
  "rollNo": "23071A0550",
  "course": "Electronics"
}
```

### PATCH

```text
PATCH http://localhost:3000/students/1
Content-Type: application/json
```

Request body:

```json
{
  "course": "Computer Engineering"
}
```

### DELETE

```text
DELETE http://localhost:3000/students/2
```

## Output

### GET Output

Expected API response:

```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Pranati Rao",
      "rollNo": "23071A0547",
      "course": "Computer Science"
    }
  ]
}
```

[Insert GET Output Screenshot Here]

### POST Output

Expected API response:

```json
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "id": 3,
    "name": "Ravi Kumar",
    "rollNo": "23071A0550",
    "course": "Electronics"
  }
}
```

[Insert POST Output Screenshot Here]

### PATCH Output

Expected API response:

```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "name": "Pranati Rao",
    "rollNo": "23071A0547",
    "course": "Computer Engineering"
  }
}
```

[Insert PATCH Output Screenshot Here]

### DELETE Output

Expected API response:

```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {
    "id": 2,
    "name": "Anita Sharma",
    "rollNo": "23071A0540",
    "course": "Information Technology"
  }
}
```

[Insert DELETE Output Screenshot Here]

## Result

The student CRUD backend was created successfully using Node.js and Express.js. The GET, POST, PATCH, and DELETE APIs were implemented and the student record with roll number `23071A0547` is displayed in the API output.
