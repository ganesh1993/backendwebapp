const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');



router.get('/users', userController.getUsers);
router.get('/profile', userController.profile);
router.post('/save', userController.save);




module.exports = router;