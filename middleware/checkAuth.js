const jwt = require('jsonwebtoken')

exports.checkAuth = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1]
        const isCustomAuth = token?.length < 500
        let decodedData
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT)
            req.user = {
                id: decodedData?._id || decodedData?.id,
                isAdmin: decodedData?.isAdmin || false
            }
        } else {
            decodedData = jwt.decode(token)
            req.user = {
                id: decodedData?.sub,
                isAdmin: decodedData?.isAdmin || false
            }
        }
        if (!token || !req.user || !decodedData) return res.status(402).json({ msg: 'Unauthenticated' })
        next()
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.checkAdmin = (req, res, next) => {
    try {
        if (!req?.user?.isAdmin) return res.status(402).json({ msg: 'Unauthorization' })
        next()
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}