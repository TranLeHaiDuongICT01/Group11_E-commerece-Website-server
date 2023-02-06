const Cart = require('../models/cartModel')

exports.createCart = async (req, res, next) => {
    try {
        const cart = await Cart.create({ userId: req?.user?.id })
        return res.status(201).json(cart)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.updateCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOneAndUpdate({ userId: req.user.id }, req.body, {
            new: true, runValidators: true
        })
        if (!cart) return res.status(404).json({ msg: "cannot find user cart" })
        return res.status(200).json(cart)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id })
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id })
        }
        return res.status(200).json(cart)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}