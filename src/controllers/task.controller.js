const Task = require('../models/task.model');

async function listTasks(_req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }).lean();
    res.json({ data: tasks, count: tasks.length });
  } catch (error) { next(error); }
}

async function getTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    return res.json({ data: task });
  } catch (error) { next(error); }
}

async function createTask(req, res, next) {
  try {
    const { title, description, completed } = req.body;
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'title is required and must be a non-empty string' });
    }
    const task = await Task.create({ title, description, completed });
    return res.status(201).json({ data: task });
  } catch (error) { next(error); }
}

async function updateTask(req, res, next) {
  try {
    const allowed = ['title', 'description', 'completed'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    if (!Object.keys(updates).length) return res.status(400).json({ error: 'No valid fields supplied' });
    if (updates.title !== undefined && (typeof updates.title !== 'string' || !updates.title.trim())) {
      return res.status(400).json({ error: 'title must be a non-empty string' });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    return res.json({ data: task });
  } catch (error) { next(error); }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    return res.status(204).send();
  } catch (error) { next(error); }
}

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
