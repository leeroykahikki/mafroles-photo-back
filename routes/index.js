const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const playerRouter = require('./playerRouter');
const tournamentRouter = require('./tournamentRouter');

router.use('/user', userRouter);
router.use('/player', playerRouter);
router.use('/tournament', tournamentRouter);

module.exports = router;
