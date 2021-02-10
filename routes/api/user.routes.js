const express = require('express')
const router = express.Router();

const Customer = require('../../models/customerDetails.model');
const Order = require('../../models/orderDetails.model');

//TEST
router.get('/test', (req, res) => {
    res.send('Helllo, User route working!');

});

//USER DETAILS AND BILL
router.post('/userDetails', async (req, res) => {
    let userId;
    var rightNow = new Date();
    var billNumber = rightNow.toISOString().replace(/[^0-9]/g, "");

    //Find or Create user
    Customer.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            const newUser = new Customer({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
            })
            newUser.save()
                .then(user => {
                    userId = user._id;
                    order(userId);
                })
                .catch(err => console.log(err));
        } else {
            userId = user._id;
            order(userId);
        }
    });

    //Creating bill with {userId}
    const order = (userId) => {
        Order.findOne({ billNumber }).then(bill => {
            if (bill) {
                res.status(302).json({ message: 'bill found! try again!' });
            } else {
                let products = [{ productId: 1, itemCount: 3 }, { productId: 121, itemCount: 3 }]
                const newOrder = new Order({
                    billNumber: billNumber,
                    customer: userId,
                    products: req.body.products
                })
                // console.log(req.body.products);
                // res.json(newOrder)
                newOrder.save()
                    .then(order => res.json(order))
                // console.log(newOrder);

            }
        })
    }
});

router.post('/finalPayment', (req, res) => {


    const newBill = new Order({

    })
})

module.exports = router;