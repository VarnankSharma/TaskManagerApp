const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middlewares/auth');

// Get Tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create Task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, userId: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

module.exports = router;
