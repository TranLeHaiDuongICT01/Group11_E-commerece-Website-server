const Order = require('../models/orderModel')

exports.createOrder = async (req, res, next) => {
    try {
        const order = await Order.create({ ...req.body, userId: req.user.id })
        return res.status(201).json(order)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.updateOrder = async (req, res, next) => {
    const { id } = req.params
    try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true, runValidators: true
        })
        if (!order) return res.status(404).json({ msg: "cannot find user cart" })
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}
exports.getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.getMonthlyIncome = async (req, res, next) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ])

        return res.status(200).json(income)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}