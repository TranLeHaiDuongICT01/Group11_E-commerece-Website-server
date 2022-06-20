const stripe = require("stripe")(process.env.STRIPE_KEY)

exports.payingOrder = async (req, res, next) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            return res.status(500).json({ msg: stripeErr })
        }
        return res.status(200).json(stripeRes)
    })
}