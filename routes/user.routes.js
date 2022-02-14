const router = require('express').Router();
const userController = require('../controllers/userController.js');

router.post("/", userController.addUser);

router.get("/self", userController.userInfo);

router.put("/self", userController.updateUser);

 module.exports = router; 