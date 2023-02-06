const User = require('../models/userModel')

exports.updateUser = async (req, res, next) => {
    const { id } = req.params
    try {
        if (req?.user?.id !== id) return res.status(402).json({ msg: 'Unauthorization' })
        const user = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        const { password, ...others } = user._doc
        return res.status(200).json({ ...others })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}
exports.deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) return res.status(404).json({ msg: 'User not found' })
        const { password, ...others } = user._doc
        return res.status(200).json({ ...others })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.getUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).select('-password')
        if (!user) return res.status(404).json({ msg: 'User not found' })
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}
exports.getUsers = async (req, res, next) => {
    const { newuser } = req.query
    try {
        let result = User.find({}).select('-password')
        if (newuser) result.sort({ _id: -1 }).limit(5)
        const users = await result

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}
exports.getUserStatus = async (req, res, next) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}