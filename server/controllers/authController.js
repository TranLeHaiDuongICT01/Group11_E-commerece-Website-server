const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.register = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    try {
        if(password !== confirmPassword)
            return res.status(400).json({msg: 'Password does not match'})
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: 'Email is already registered' })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ name, email, id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT, { expiresIn: '3h' })
        return res.status(201).json({
            token, name, email, _id: newUser._id, isAdmin: newUser.isAdmin
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ msg: 'Email is not registered yet' })
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return res.status(400).json({ msg: 'Wrong password' })

        const token = jwt.sign({ name: user.name, email, id: user._id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: '3h' })
        return res.status(201).json({
            token, name: user.name, email, _id: user._id, isAdmin: user.isAdmin
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

