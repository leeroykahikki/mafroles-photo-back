const Router = require('express');
const router = new Router();
const playerController = require('../controllers/playerController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/createPlayer', authMiddleware, playerController.createPlayer);
router.post('/deletePlayer', authMiddleware, playerController.deletePlayer);
router.get('/getAllPlayers', authMiddleware, playerController.getAllPlayers);

module.exports = router;
