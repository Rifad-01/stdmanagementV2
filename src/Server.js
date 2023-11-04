import express from 'express';
import bodyParser from 'body-parser';
import cron from 'cron';

const app = express();
app.use(bodyParser.json());

import { login as adminLogin, addStudent, assignTask } from './controllers/adminController.js';
import { login as studentLogin, viewTasks, markTaskAsDone } from './controllers/studentController.js';

import { verifyAdminToken, verifyStudentToken } from './middleware/authMiddleware.js';

app.post('/admin/login', adminLogin);
app.post('/student/login', studentLogin);
app.post('/admin/add-std', verifyAdminToken, addStudent);
app.post('/admin/assign-task', verifyAdminToken, assignTask);
app.get('/student/tasks', verifyStudentToken, viewTasks);
app.put('/student/done/:taskId', verifyStudentToken, markTaskAsDone);

app.listen(9900, () => {
  console.log(`Server is running on port 9900`);
});
