const express = require('express');
const apisController = require('../controller/apisController')
const router = express.Router();

// GET  : localhost/3000/apis/post

router.post('/postEmail', apisController.postEmail)
router.post('/postGameHistory', apisController.postGameHistory)


module.exports = router;
