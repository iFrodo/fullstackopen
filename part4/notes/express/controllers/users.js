const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')



usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('notes', { content: 1, important: 1 });
    res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
    const { login, name, password } = req.body
    const saltRounds = 10
    console.log(req.body)
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        login,
        name,
        passwordHash
    })
    const savedUser = await user.save();
    res.status(201).json(savedUser)
})

module.exports = usersRouter