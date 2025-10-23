const express = require('express');
const { createProject, deleteProject, updateProject, updateAll } = require('../controllers/project.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { fetchProjects } = require('../controllers/project.controller');

const router = express.Router();

router.get('/fetchall',authMiddleware,fetchProjects)
router.post('/create', authMiddleware, createProject);
router.delete('/delete', authMiddleware, deleteProject);
router.put('/update', authMiddleware, updateProject);
router.put('/updateAll',authMiddleware,updateAll)

module.exports = router;