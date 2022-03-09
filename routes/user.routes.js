const router = require('express').Router();
const userController = require('../controllers/userController.js');
const pictureController = require('../controllers/pictureController');

router.post("/", userController.addUser);

router.get("/self", userController.userInfo);

router.put("/self", userController.updateUser);

router.post("/self/pic", pictureController.createPicture);

router.get("/self/pic", pictureController.getPicture);

router.delete("/self/pic", pictureController.deletePicture);

 module.exports = router; 