const express = require('express');
const router = express.Router();


const propertyController = require('../controllers/property_controller');

router.get('/list', propertyController.list);
router.get('/add', propertyController.add);
router.post('/add_db', propertyController.addToDB);
router.get('/destroy/:id', propertyController.destroy);
// router.get('/status', usersController.sessionLogout)


module.exports = router;