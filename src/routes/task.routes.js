const router = require('express').Router();
const controller = require('../controllers/task.controller');

router.get('/', controller.listTasks);
router.post('/', controller.createTask);
router.get('/:id', controller.getTask);
router.patch('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
