const router = require('express').Router();
const userController = require('../controllers/userContorller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/validate' , userController.validateToken);
router.post('/logout', userController.logout);

module.exports = router;
