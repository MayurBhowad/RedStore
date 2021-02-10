const express = require('express');
const router = express.Router();
const shortid = require('shortid')
const Razorpay = require('razorpay');

require('dotenv').config()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const Product = require('../../models/productDetails.model');


//verification
router.post('/verification', (req, res) => {
    const secret = process.env.RAZORPAY_VERIFICATION_SECRET
    // console.log(req.body);

    const crypto = require('crypto');

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    // console.log(digest, req.headers['x-razorpay-signature']);
    if (digest === req.headers['x-razorpay-signature']) {
        console.log('payment request is legit');
        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {

    }

    res.json({ status: 'ok' })
})

//bill payment
router.post('/razorpay', async (req, res) => {

    const products = req.body.products;
    let totalPrice = 35;
    const findTotalPrice = new Promise((resolve, reject) => {
        products.map((prod, i) => {

            let discount_price = 0;
            Product.findOne({ productNumber: prod.productNumber }).then(product => {
                discount_price = ((product.price * product.discount) / 100);
                discount_price = product.price - discount_price;
                let MRP = discount_price * prod.itemCount
                totalPrice = (~~totalPrice) + (~~MRP);
                if ((i + 1) >= products.length) {
                    resolve()
                }
            })
        })
    })

    findTotalPrice.then(async () => {
        const payment_capture = 1
        const amount = totalPrice
        const currency = 'INR'


        const options = {
            amount: (amount * 100),
            currency,
            receipt: shortid.generate(),
            payment_capture
        }

        try {
            const response = await razorpay.orders.create(options)

            res.json({
                id: response.id,
                currency: response.currency,
                amount: response.amount
            })
        } catch (error) {
            console.log(error);
        }
    })


})


module.exports = router;