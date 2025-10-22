const Project = require('../models/Project');
const logger = require('../logger');

// Create Project
const createProject = async (req, res) => {
  try {
    const { name, userId , description } = req.body;

    // Validation
    if (!name || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Project name and userId are required' 
      });
    }

    if (name.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Project name cannot be empty' 
      });
    }

    // Create project
    const project = await Project.create({ name, userId,description,status:'active' });

    logger.info(`Project created: ${project._id}`);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    logger.error('Create project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating project' 
    });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.query;

    // Validation
    if (!projectId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Project ID is required' 
      });
    }

    // Delete project
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }

    logger.info(`Project deleted: ${projectId}`);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    logger.error('Delete project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting project' 
    });
  }
};

const updateProject = async (req, res) => {
  // Implementation for updating a project can be added here
   try {
    const { projectId, status } = req.body;
    console.log(req.body);

    // Validation
    if (!projectId || !status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Project ID and status are required' 
      });
    }

    const validStatuses = ['active',  'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be: active, completed' 
      });
    }

    // Update task
    const project = await Project.findByIdAndUpdate(
      projectId,
      { status },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }

    logger.info(`Project updated: ${projectId}`);

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    logger.error('Update Project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating project' 
    });
  }
}

const fetchProjects = async (req, res) => {
  try {
    const { userId } = req.query;
    if(!userId){
        logger.error('Fetch projects error: User ID is required');
        return res.status(400).json({ 
            success: false, 
            message: 'User ID is required' 
        });
    }
    const projects =  await Project.find({ userId });
    res.status(200).json({
        success: true,
        projects});
    } catch (error) { 
        logger.error('Fetch projects error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching projects' 
        });
    }
};

module.exports = { createProject, deleteProject , fetchProjects , updateProject};