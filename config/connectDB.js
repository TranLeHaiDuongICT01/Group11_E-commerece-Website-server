const mongoose = require('mongoose')

exports.connectMongose = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

