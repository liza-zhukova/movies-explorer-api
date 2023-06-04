const router = require('express').Router();
const auth = require('../middlewares/auth');
const { authRouter } = require('./authRouter');
const errorRouter = require('./errorRouter');
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');

router.use('/', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', errorRouter);

module.exports = router;
