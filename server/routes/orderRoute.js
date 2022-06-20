const router = require('express').Router()
const { createOrder, updateOrder, getAllOrders, getMonthlyIncome, getUserOrders } = require('../controllers/orderController')
const { checkAuth, checkAdmin } = require('../middleware/checkAuth')
router.post('/new', checkAuth, createOrder)
router.get('/userorder', checkAuth, getUserOrders)
router.get('/income', checkAuth, checkAdmin, getMonthlyIncome)
router.patch('/:id', checkAuth, checkAdmin, updateOrder)
router.get('/all', checkAuth, checkAdmin, getAllOrders)

module.exports = router