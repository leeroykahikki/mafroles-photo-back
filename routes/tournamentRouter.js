const Router = require('express');
const router = new Router();
const tournamentController = require('../controllers/tournamentController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/createTournament', authMiddleware, tournamentController.createTournament);
router.delete('/deleteTournament', authMiddleware, tournamentController.deleteTournament);
router.get('/getTournament', authMiddleware, tournamentController.getTournament);
router.get('/getAllTournaments', authMiddleware, tournamentController.getAllTournaments);

module.exports = router;
