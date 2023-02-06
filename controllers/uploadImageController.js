const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_API_SECRET
})
exports.uploadImage = (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: 'No files were uploaded' })
        }

        const file = req.files.file
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: 'File size is too large' })
        }
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: 'File uploaded is not an image' })
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'products' }, async (err, result) => {
            if (err) return res.status(500).json({ msg: err.message || 'Something went wrong' })
            removeTmp(file.tempFilePath)
            return res.status(200).json({ public_id: result.public_id, url: result.secure_url })
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

exports.deleteImage = (req, res, next) => {
    const { public_id } = req.body
    try {
        if (!public_id) {
            return res.status(404).json({ msg: 'No image' })
        }
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err
            res.json({ msg: 'Delete image successfully' })
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}