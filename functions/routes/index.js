const { Router } = require("express");
const router = Router()
const { getusers, createUser, loginUser } = require('../controllers');
const { verifyToken } = require('../middlewares');

router.get('/users', verifyToken, getusers)
router.post('/users', createUser)
router.post('/login', loginUser)

module.exports = router