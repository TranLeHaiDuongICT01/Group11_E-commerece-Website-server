const router = require('express').Router()
const { createCart, getCart, updateCart } = require('../controllers/cartController')
const { checkAuth } = require('../middleware/checkAuth')

router.post('/new', checkAuth, createCart)
router.route('/usercart')
    .get(checkAuth, getCart)
    .patch(checkAuth, updateCart)
module.exports = router