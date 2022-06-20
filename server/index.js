const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const { connectMongose } = require('./config/connectDB')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

const PORT = process.env.PORT || 5000

app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/products', require('./routes/productRoute'))
app.use('/api/carts', require('./routes/cartRoute'))
app.use('/api/orders', require('./routes/orderRoute'))
app.use('/api/image', require('./routes/uploadImageRoute'))
app.use('/api/checkout', require("./routes/stripeRoute"))

connectMongose(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})