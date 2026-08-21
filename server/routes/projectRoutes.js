const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  likeProject 
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleGuard');

router.route('/').get(getProjects).post(protect, requireRole('admin'), createProject);
router.route('/:id').put(protect, requireRole('admin'), updateProject).delete(protect, requireRole('admin'), deleteProject);
router.post('/:id/like', likeProject);

module.exports = router;
