const express = require('express');
const router = express.Router();


const Product = require('../../models/productDetails.model');
const Customer = require('../../models/customerDetails.model');
const Order = require('../../models/orderDetails.model');

//TEST
router.get('/test', (req, res) => {
    res.send('Hello, This is test!');
})

//Product
router.get('/allProducts', (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const results = {};

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    Product.find()
        .then(products => {
            if (!products) {
                res.status(404).json({ message: 'Products not Found!' })
            } else {
                results.totalProducts = products.length;

                results.products = products.slice(startIndex, endIndex);
                res.status(200).json(results)
            }
        })
});

router.get('/:productNumber', (req, res) => {
    Product.findOne({ productNumber: +req.params.productNumber })
        .then(product => {
            if (!product) {
                res.status(404).json({ message: 'Products not Found!' })
            } else {
                res.status(200).json(product)
            }
        })
});

router.post('/clientDetails', (req, res) => {
    Customer.findOne({ email: req.body.email })
        .then(customer => {
            if (customer) {
                res.status(400).json({ message: 'user already exist!' });
            } else {
                const newCustomer = new Customer({
                    name: req.body.name,
                    email: req.body.email,
                    address: req.body.address
                });

                newCustomer.save()
                    .then(customer => res.json(customer))
                    .catch(err => console.log(err));
            }

        })
})

router.post('/order', (req, res) => {
    let customerId = req.body.customerId;
    let productsNumbers = req.body.products.split(",");

    const newOrder = new Order({
        customer: customerId,
        products: productsNumbers
    });

    newOrder.save()
        .then(order => Order.findOne({ _id: newOrder.id }).populate('customer').populate('products')
            .then(orders => {
                res.json(orders)
            }))
        .catch(err => console.log(err));
})

router.get('/allOrder', (req, res) => {
    Order.find().populate('customer').populate('products')
        .then(orders => {
            res.json(orders)
        })
})


module.exports = router;