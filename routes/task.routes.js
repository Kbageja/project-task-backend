const express = require('express');
const { addTask, updateTask, deleteTask } = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { fetchTasks } = require('../controllers/task.controller');

const router = express.Router();

router.get('/fetchtasks',authMiddleware,fetchTasks)
router.post('/add', authMiddleware, addTask);
router.put('/update', authMiddleware, updateTask);
router.delete('/delete', authMiddleware, deleteTask);

module.exports = router;