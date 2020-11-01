const express = require('express');
const viewController = require('../controller/viewsController')
const router = express.Router();


router.get('/', viewController.getIndexView)
router.get('/game', viewController.getGameView)
router.get('/history', viewController.getHistoryView)

module.exports = router;
