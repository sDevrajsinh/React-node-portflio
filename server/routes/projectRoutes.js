const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProjects).post(protect, createProject);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);
router.post('/:id/like', (req, res, next) => {
  // Public route for likes
  const { likeProject } = require('../controllers/projectController');
  likeProject(req, res);
});

module.exports = router;
