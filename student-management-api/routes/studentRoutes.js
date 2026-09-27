const express = require('express');
const router = express.Router();
const students = require('../data/students');

// 1. GET all students
router.get('/', (req, res) => {
  res.status(200).json(students);
});

// 2. GET a single student by ID
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// 3. POST - Create a new student
router.post('/', (req, res) => {
  const { name, course } = req.body;

  // Check if name and course are provided
  if (!name || !course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  // Generate new ID (one higher than the last student's ID)
  const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;

  const newStudent = {
    id: newId,
    name: name,
    course: course
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// 4. PUT - Update student by ID
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  // Check if student exists
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, course } = req.body;

  // Check if at least one field is provided to update
  if (!name && !course) {
    return res.status(400).json({ message: "Please provide name or course to update" });
  }

  if (name) {
    student.name = name;
  }
  if (course) {
    student.course = course;
  }

  res.status(200).json({
    message: "Student updated successfully",
    student: student
  });
});

// 5. DELETE - Remove student by ID
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);

  // Check if student exists
  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);

  res.status(200).json({
    message: "Student deleted successfully"
  });
});

module.exports = router;
