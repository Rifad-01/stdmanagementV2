
import jwt from 'jsonwebtoken';

const adminEmail = 'admin@aadmin.com';
const adminPassword = 'admin';
const adminSecretKey = 'admin1234';

const login = (req, res) => {
  const { email, password } = req.body;
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, adminSecretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const students = [];

const addStudent = (req, res) => {
  const { name, email, password, department } = req.body;

  // Check if the email already exists in the list of students
  const existingStudent = students.find((student) => student.email === email);

  if (existingStudent) {
    res.status(400).json({ message: 'Student with the same email already exists' });
  } else {
    // Create a new student object and add it to the list
    const newStudent = { name, email, password, department };
    students.push(newStudent);

    res.status(201).json({ message: 'Student added successfully' });
  }
};

// Function to list all students (for demonstration purposes)
const listStudents = (req, res) => {
  res.json(students);
};

// Sample data store for tasks (you can replace this with a database)
const tasks = [];

// Function to assign a task to a student
const assignTask = (req, res) => {
  const { studentEmail, task, dueTime } = req.body;

  // Check if the student with the provided email exists
  const student = students.find((s) => s.email === studentEmail);

  if (!student) {
    res.status(404).json({ message: 'Student not found' });
  } else {
    // Create a new task and add it to the list of tasks
    const newTask = { studentEmail, task, dueTime, status: 'pending' };
    tasks.push(newTask);

    res.status(201).json({ message: 'Task assigned successfully' });
  }
};

export { login, addStudent, listStudents, assignTask };