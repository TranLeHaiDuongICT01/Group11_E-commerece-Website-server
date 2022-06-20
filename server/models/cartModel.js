const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: [
            {
                _id: {
                    type: String,
                },
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
                images: {
                    type: Array,
                },
                categories: {
                    type: Array,
                },
                color: {
                    type: Array,
                },
                size: {
                    type: Array
                },
                price: {
                    type: Number
                },
                inStock: {
                    type: Boolean
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    },
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)