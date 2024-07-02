const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const playerRouter = require('./playerRouter');

router.use('/user', userRouter);
router.use('/player', playerRouter);

module.exports = router;
