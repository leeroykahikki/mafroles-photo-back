const Router = require('express');
const router = new Router();
const playerController = require('../controllers/playerController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/createPlayer', authMiddleware, playerController.createPlayer);
router.delete('/deletePlayer', authMiddleware, playerController.deletePlayer);
router.get('/getAllPlayers', authMiddleware, playerController.getAllPlayers);

router.put('/addPlayerTournament', authMiddleware, playerController.addPlayerTournament);
router.put('/deletePlayerTournament', authMiddleware, playerController.deletePlayerTournament);

module.exports = router;
