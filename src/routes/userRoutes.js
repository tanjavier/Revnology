const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { uploadProfile, uploadDocument } = require('../middleware/upload');
const userStatusController = require('../controllers/userStatusController');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (require authentication)
router.get('/users', auth, userController.getAllUsers);
router.get('/users/:id', auth, userController.getUser);
router.put('/users/:id', auth, userController.updateUser);
router.delete('/users/:id', auth, userController.deleteUser);

router.post('/users/profile-picture', auth, uploadProfile.single('profile'), userController.uploadProfilePicture);
router.post('/users/document', auth, uploadDocument.single('document'), userController.uploadDocument);
router.get('/users/document', auth, userController.getUserDocument);
router.get('/users/:userId/status', auth, userStatusController.checkUserStatus);

module.exports = router;