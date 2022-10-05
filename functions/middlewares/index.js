const jwt = require('jsonwebtoken')
const secret = 'shhh'

const createToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' })
}

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization

  try {
    await jwt.verify(token, secret);
    next()
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  createToken,
  verifyToken
}