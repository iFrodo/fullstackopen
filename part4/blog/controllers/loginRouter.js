const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = require('../utils/config').SECRET




loginRouter.post('/', async (req, res, next) => {
    const { login, password } = req.body
    const user = await User.findOne({ login })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid login or password'
        })
    }
    const userForToken = {
        login: user.login,
        id: user.id
    }
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        { expiresIn: 60*60 }
      )


    res.status(201).json({ token, login: user.login, name: user.name })
})

module.exports = { loginRouter }