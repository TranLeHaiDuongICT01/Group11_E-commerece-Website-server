const Product = require('../models/productModel')

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.updateProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true, runValidators: true
        })
        if (!product) return res.status(404).json({ msg: "Product not found" })
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}
exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) return res.status(404).json({ msg: "Product not found" })
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}
exports.getProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ msg: "Product not found" })
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

exports.getProducts = async (req, res, next) => {
    const { title, color, size, category, sort, fields, numericFilter } = req.query
    try {
        const queryObject = {}
        if (title) {
            queryObject.title = { $regex: title, $options: 'i' }
        }
        if(color) {
            queryObject.color = color
        }

        if(size) {
            queryObject.size = size
        }

        if (category) {
            queryObject.categories = { $in: [category] }
        }
        if (numericFilter) {
            const operatorMap = {
                '>': '$gt',
                '<': '$lt',
                '=': '$eq',
                '>=': '$gte',
                '<=': '$lte'
            }
            const regEx = /\b(<|>|<=|>=|=)\b/g
            let filters = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`)
            const options = ['price']
            filters = filters?.split(',')?.forEach(item => {
                const [field, operator, value] = item?.split('-')
                if (options.includes(field)) {
                    queryObject[field] = { ...queryObject[field], [operator]: Number(value) }
                }
            });
        }
        let result = Product.find(queryObject)
        let result2 = Product.find(queryObject)
        if (sort) {
            const sortList = sort?.split(',')?.join(' ')
            result = result.sort(sortList)
        } else result = result.sort('-createdAt')

        if (fields) {
            const fieldList = fields?.split(',')?.join(' ')
            result = result.select(fieldList)
        }

        const page = Number(req?.query?.page) || 1
        const limit = Number(req?.query?.limit) || 10
        const skip = (Number(page) - 1) * limit

        // console.log(category, page);

        result = result.skip(skip).limit(limit)

        const productsCount = await result2

        const products = await result

        const total = productsCount.length


        res.status(200).json({ products, currentPage: Number(page), numberOfPage: Math.ceil(total / limit) })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

