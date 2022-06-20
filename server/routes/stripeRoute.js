const router = require('express').Router()
const { payingOrder } = require('../controllers/stripeController')
router.post('/payment', payingOrder)

module.exports = router