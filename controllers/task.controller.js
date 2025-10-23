const Task = require('../models/task.js');
const logger = require('../logger');

// Add Task
const addTask = async (req, res) => {
  try {
    const { title, description, projectId, userId,dueDate } = req.body;

    // Validation
    if (!title || !description || !projectId || !userId || !dueDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, description, projectId, and userId are required' 
      });
    }

    if (title.trim().length === 0 || description.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and description cannot be empty' 
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      projectId,
      userId,
      status: 'pending',
      dueDate
    });

    logger.info(`Task created: ${task._id}`);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    logger.error('Add task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating task' 
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    // Validation
    if (!taskId || !status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Task ID and status are required' 
      });
    }

    const validStatuses = ['pending', 'blocked', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be: pending, in-progress, or completed' 
      });
    }

    // Update task
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    logger.info(`Task updated: ${taskId}`);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    logger.error('Update task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating task' 
    });
  }
};

const updateTaskAll = async(req,res)=>{
  try {
    const { taskId, status , title , description , dueDate  } = req.body;

    // Validation
    if (!taskId || !status || !title || !description || !dueDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'All task fields are required' 
      });
    }

    const validStatuses = ['pending', 'blocked', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be: pending, blocked, or completed' 
      });
    }

    // Update task
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status , title , description , dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    logger.info(`Task updated: ${taskId}`);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    logger.error('Update task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating task' 
    });
  }
}

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    // Validation
    if (!taskId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Task ID is required' 
      });
    }

    // Delete task
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    logger.info(`Task deleted: ${taskId}`);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    logger.error('Delete task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting task' 
    });
  }
};

const fetchTasks=async(req,res)=>{
    const {projectId} = req.query;
    try{
        if(!projectId){
            logger.error('Fetch tasks error: Project ID is required');
            return res.status(400).json({ 
                success: false, 
                message: 'Project ID is required' 
            });
        }
        const tasks = await Task.find({projectId});
        res.status(200).json({
            success:true,
            tasks
        });
    }
    catch(error){
        logger.error('Fetch tasks error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching tasks' 
        });
}
};

module.exports = { addTask, updateTask, deleteTask,fetchTasks,updateTaskAll };
